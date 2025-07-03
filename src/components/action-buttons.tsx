import { Loader2Icon } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface ActionButtonsProps {
  onCancel: () => void;
  loading: boolean;
  onSubmitLabel?: string;
  submittingLabel?: string;
  showIcon?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  onCancel,
  loading,
  onSubmitLabel = 'Submit',
  submittingLabel = 'Submitting...',
  showIcon = false,
  disabled = false,
  icon,
}) => {
  return (
    <div className="flex gap-3 pt-4 border-t border-gray-700/50">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="flex-1 h-10 px-4 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-gray-700 transition-colors duration-200"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading || disabled}
        className="flex-1 h-10 px-4 text-sm font-medium text-white bg-[#00553d] border-[#00553d]
        hover:shadow-[0_1px_4px_#0000004d] hover:bg-blend-lighten hover:bg-[linear-gradient(#d8f5e914,#d8f5e914)] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
            {submittingLabel}
          </>
        ) : (
          <>
            {showIcon && icon}
            {onSubmitLabel}
          </>
        )}
      </button>
    </div>
  );
};
