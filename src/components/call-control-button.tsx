import clsx from 'clsx';
import { IconButtonProps } from './icon-button';

type CallControlButtonProps = Omit<IconButtonProps, 'variant'> & {
  active?: boolean;
};

export const CallControlButton = ({
  active = false,
  className,
  icon,
  onClick,
  title,
}: CallControlButtonProps) => {
  return (
    <button
      title={title}
      className={clsx(
        'w-9 h-9 rounded-full inline-flex items-center justify-center',
        active && 'bg-[#E0E0E0] hover:bg-[#E0E0E0] [&_path]:fill-[#101214]',
        !active &&
          'bg-[#F8F8F840] [&_path]:fill-[#E0E0E0CC] hover:bg-[#696A6B] [&_path]:hover:fill-white',
        className,
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
