import fs from 'fs';
import path from 'path';

const IGNORED = [
  'node_modules',
  'dist',
  'dist-ssr',
  '.git',
  '.gemini',
  '.DS_Store',
  'npm-debug.log',
  'yarn-error.log',
  'upload-github.mjs',
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (IGNORED.includes(file)) return;
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function fetchWithRetry(url, options, maxRetries = 4) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const res = await fetch(url, options);
      return res;
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      console.log(`\n⚠️ Network retry ${attempt}/${maxRetries} for ${url}...`);
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

async function main() {
  console.log('🌌 AuMDS GitHub Direct Uplink (Zero-Git Node.js Tool)');
  console.log('----------------------------------------------------');

  const token = process.argv[2] || process.env.GITHUB_TOKEN;
  const owner = process.argv[3] || process.env.GITHUB_OWNER || 'dee1007jogi';
  const repo = process.argv[4] || process.env.GITHUB_REPO || 'AuMDS_3D';

  if (!token || !owner || !repo) {
    console.error('❌ Error: Token, Owner, and Repo arguments required.');
    process.exit(1);
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'AuMDS-Uplink-Agent',
  };

  try {
    // 1. Connect to repository
    console.log(`🔍 Connecting to https://github.com/${owner}/${repo}...`);
    const repoRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!repoRes.ok) {
      throw new Error(`Repository connection failed: ${repoRes.status} ${await repoRes.text()}`);
    }
    const repoData = await repoRes.json();
    let defaultBranch = repoData.default_branch || 'main';
    console.log(`✅ Connected to repository: ${repoData.full_name}`);

    // 2. Check if repository is empty; if empty, initialize root commit with README.md
    let refRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${defaultBranch}`, { headers });
    let latestCommitSha = null;

    if (!refRes.ok) {
      console.log('📦 Repository is currently empty. Initializing initial root commit...');
      const initRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Initial commit: AuMDS Universe Core',
          content: Buffer.from('# AuMDS — 3D Redesign\n\nCo-creating the Universe of Brands\n').toString('base64'),
          branch: 'main',
        }),
      });

      if (!initRes.ok) {
        throw new Error(`Failed to initialize empty repository: ${await initRes.text()}`);
      }

      const initData = await initRes.json();
      latestCommitSha = initData.commit.sha;
      defaultBranch = 'main';
      console.log(`✅ Root commit created: ${latestCommitSha.substring(0, 7)}`);
      // Brief pause for GitHub to sync git database
      await new Promise(r => setTimeout(r, 1500));
    } else {
      const refData = await refRes.json();
      latestCommitSha = refData.object.sha;
      console.log(`📌 Found current commit SHA: ${latestCommitSha.substring(0, 7)}`);
    }

    // 3. Scan files
    const rootDir = process.cwd();
    const files = getAllFiles(rootDir);
    console.log(`🚀 Packaging ${files.length} project files...`);

    // 4. Upload blobs in parallel batches
    const treeItems = [];
    const batchSize = 6;
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (filePath) => {
          const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
          const content = fs.readFileSync(filePath);
          const isBinary = /[\x00-\x08\x0E-\x1F]/.test(content.slice(0, 512).toString());

          const blobRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: content.toString(isBinary ? 'base64' : 'utf8'),
              encoding: isBinary ? 'base64' : 'utf-8',
            }),
          });

          if (!blobRes.ok) {
            console.warn(`\n⚠️ Blob creation failed for ${relativePath}: ${await blobRes.text()}`);
            return;
          }

          const blobData = await blobRes.json();
          treeItems.push({
            path: relativePath,
            mode: '100644',
            type: 'blob',
            sha: blobData.sha,
          });
          process.stdout.write(`\r  -> Synchronized [${treeItems.length}/${files.length}] files...`);
        })
      );
    }
    console.log('\n✅ All project files converted to Git blobs.');

    // 5. Generate Git Tree
    console.log('🌲 Generating dimensional Git Tree...');
    const treePayload = {
      tree: treeItems,
    };
    if (latestCommitSha) {
      const commitRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers });
      if (commitRes.ok) {
        const commitData = await commitRes.json();
        treePayload.base_tree = commitData.tree.sha;
      }
    }

    const treeRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(treePayload),
    });

    if (!treeRes.ok) {
      throw new Error(`Tree generation failed: ${await treeRes.text()}`);
    }
    const treeData = await treeRes.json();
    console.log(`✅ Git Tree created: ${treeData.sha.substring(0, 7)}`);

    // 6. Create Commit
    console.log('✍️ Finalizing Commit: "AuMDS 3D Redesign — Co-creating the Universe of Brands"...');
    const commitBody = {
      message: 'AuMDS 3D Redesign — Co-creating the Universe of Brands (Full 3D Ecosystem)',
      tree: treeData.sha,
      parents: latestCommitSha ? [latestCommitSha] : [],
    };

    const newCommitRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(commitBody),
    });

    if (!newCommitRes.ok) {
      throw new Error(`Commit creation failed: ${await newCommitRes.text()}`);
    }
    const newCommitData = await newCommitRes.json();
    console.log(`✅ Commit created: ${newCommitData.sha.substring(0, 7)}`);

    // 7. Update Ref to point to new commit
    console.log(`🔗 Updating branch ref 'refs/heads/${defaultBranch}'...`);
    let updateRefRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${defaultBranch}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sha: newCommitData.sha,
        force: true,
      }),
    });

    if (!updateRefRes.ok) {
      updateRefRes = await fetchWithRetry(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref: `refs/heads/${defaultBranch}`,
          sha: newCommitData.sha,
        }),
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 UPLOAD COMPLETE! Codebase is LIVE on GitHub:');
    console.log(`🌐 Repository: https://github.com/${owner}/${repo}`);
    console.log(`🌿 Branch: ${defaultBranch}`);
    console.log(`📦 Commit: ${newCommitData.sha}`);
    console.log('='.repeat(60) + '\n');
  } catch (err) {
    console.error(`\n❌ Direct Upload Error: ${err.message}`);
  }
}

main();
