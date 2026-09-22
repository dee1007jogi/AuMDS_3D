import React from 'react';
import { audioEngine } from './AudioEngine';

export interface EmotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EmotionButton: React.FC<EmotionButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioEngine.playClick();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    audioEngine.playHover();
  };

  // Base styling matching Emotion Agency .button
  const sizeClasses = {
    sm: 'h-9 px-4 text-xs tracking-wider gap-2',
    md: 'h-12 px-6 text-sm tracking-wide gap-2.5',
    lg: 'h-14 px-8 text-base tracking-wide gap-3',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#9047ff] text-white hover:bg-[#7114ff] shadow-[0_10px_25px_rgba(144,71,255,0.35)] border border-purple-400/30',
    secondary:
      'bg-white text-[#2a1647] hover:bg-[#f5efff] border border-[#e2e4f0] shadow-sm',
    outline:
      'bg-transparent text-current border border-current/25 hover:border-current/80 hover:bg-current/5',
    dark:
      'bg-[#181818] text-white hover:bg-[#25282e] border border-white/10 shadow-lg',
    ghost:
      'bg-transparent text-current hover:bg-black/5 dark:hover:bg-white/5',
  }[variant];

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`group relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 select-none overflow-hidden cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Icon on left */}
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}

      {/* Double-Layer Sliding Text Container */}
      <div className="emotion-btn-text-wrapper font-medium font-sans">
        <span className="emotion-btn-sub emotion-btn-sub-1">{children}</span>
        <span aria-hidden="true" className="emotion-btn-sub emotion-btn-sub-2 text-inherit">
          {children}
        </span>
      </div>

      {/* Icon on right */}
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </button>
  );
};
