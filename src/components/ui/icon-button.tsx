import clsx from 'clsx';
import { ReactNode } from 'react';

export interface IconButtonProps {
  disabled?: boolean;
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
}

export const IconButton = ({
  disabled = false,
  icon,
  onClick,
  title,
  className,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={clsx(
        'group p-[3px] m-[1px] rounded cursor-pointer inline-flex items-center justify-center hover:bg-[#F8F8F840] disabled:bg-transparent [&_path]:disabled:fill-[#8A8B8D]',
        className,
      )}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};
