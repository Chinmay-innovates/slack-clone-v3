import { Loader2Icon } from 'lucide-react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

export const Button = ({
  children,
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  variant = 'primary',
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={
        'min-w-[82.55px] flex items-center justify-center p-4 font-bold rounded text-[13.8px] tracking-[.057em] uppercase transition-all duration-300 ease-out disabled:bg-[#DDDDDD] disabled:border-[#DDDDDD] disabled:hover:bg-[#DDDDDD] disabled:hover:border-[#DDDDDD] disabled:text-[#1d1c1dbf] ' +
        (variant === 'primary'
          ? 'text-[#FFF] bg-[#611F69] border-[#611F69] hover:bg-[#4A154B] border hover:border-[#4A154B]'
          : 'text-[#611F69] bg-[#FFF] shadow-[inset_0_0_0_1px_#611F69] hover:shadow-[inset_0_0_0_2px_#611F69]') +
        className
      }
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {!loading && children}
      {loading && <Loader2Icon className="animate-spin size-5" />}
    </button>
  );
};
