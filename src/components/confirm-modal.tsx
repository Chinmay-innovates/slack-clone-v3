import { Modal } from '@/components/ui/modal';
import { AlertCircle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  error?: string;
}

export const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  error,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal open={open} onClose={onClose} loading={loading} title="Delete Message">
      <div className="w-full max-w-lg mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm();
          }}
          className="space-y-5"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Something went wrong:</span>
              </div>
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          {/* Delete Message Notice */}
          <p className="text-sm text-gray-300">
            Are you sure you want to permanently delete this message? This action cannot be undone.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
