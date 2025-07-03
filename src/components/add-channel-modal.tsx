import { FormEvent, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hash, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

import { AppContext } from '../app/client/layout';
import { TextField } from './ui/text-field';
import { ActionButtons } from './action-buttons';
import { Modal } from './modal';

interface AddChannelModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddChannelModal = ({ open, onClose }: AddChannelModalProps) => {
  const router = useRouter();
  const { setChannel, workspace, setWorkspace } = useContext(AppContext);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const channelNameRegex = useMemo(() => {
    const channelNames = workspace.channels.map((channel) => channel.name);
    return `^(?!${channelNames.join('|')}).+$`;
  }, [workspace.channels]);

  const isChannelNameTaken = useMemo(() => {
    return workspace.channels.some(
      (channel) => channel.name.toLowerCase() === channelName.toLowerCase(),
    );
  }, [workspace.channels, channelName]);

  const isChannelNameValid = useMemo(() => {
    return channelName.length >= 1 && channelName.length <= 80 && !isChannelNameTaken;
  }, [channelName, isChannelNameTaken]);

  const createChannel = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const validationErrors: string[] = [];

    if (!channelName.trim()) {
      validationErrors.push('Channel name is required');
    } else if (channelName.length < 1 || channelName.length > 80) {
      validationErrors.push('Channel name must be between 1 and 80 characters');
    } else if (isChannelNameTaken) {
      validationErrors.push('That name is already taken by another channel');
    }

    if (channelDescription.length > 250) {
      validationErrors.push('Channel description must be less than 250 characters');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      setLoading(true);
      const response = await fetch(`/api/workspaces/${workspace.id}/channels/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: channelName.trim(),
          description: channelDescription.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const { channel } = result;
        setWorkspace({
          ...workspace,
          channels: [...workspace.channels, { ...channel }],
        });
        setChannel(channel);
        closeModal();
        router.push(`/client/${workspace.id}/${channel.id}`);
      } else {
        setErrors([`Error: ${result.error}`]);
      }
    } catch (error) {
      console.error('Error creating channel:', error);
      setErrors(['An unexpected error occurred.']);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setChannelName('');
    setChannelDescription('');
    setErrors([]);
    onClose();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={closeModal} loading={loading} title="Create a channel">
      <div className="w-full max-w-lg mx-auto">
        <form onSubmit={createChannel} className="space-y-5">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Please fix these issues:</span>
              </div>
              <ul className="text-xs text-red-300 space-y-0.5">
                {errors.map((error, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Channel Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Channel Details</h3>
            </div>

            <div className="space-y-4">
              {/* Channel Name Input */}
              <div className="space-y-2">
                <TextField
                  name="channelName"
                  label="Channel name"
                  placeholder="e.g. plan-budget"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value.toLowerCase())}
                  pattern={channelNameRegex}
                  title="That name is already taken by another channel in this workspace"
                  maxLength={80}
                  required
                />

                {/* Channel Name Validation Feedback */}
                {channelName && (
                  <div className="flex items-center gap-2 text-xs">
                    {isChannelNameValid ? (
                      <div className="flex items-center gap-1 text-green-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Channel name is available</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>
                          {isChannelNameTaken ? 'Name already taken' : 'Invalid channel name'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Character Count */}
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Use lowercase letters, numbers, and hyphens</span>
                  <span className={channelName.length > 80 ? 'text-red-400' : ''}>
                    {channelName.length}/80
                  </span>
                </div>
              </div>

              {/* Channel Description */}
              <div className="space-y-2">
                <TextField
                  name="channelDescription"
                  label={
                    <span className="flex items-center gap-2">
                      <FileText className="w-3 h-3" />
                      Description
                      <span className="text-gray-400 text-xs">(optional)</span>
                    </span>
                  }
                  placeholder="Add a description to help others understand this channel's purpose"
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                  multiline={4}
                  maxLength={250}
                />

                {/* Description Character Count */}
                <div className="flex justify-end text-xs text-gray-400">
                  <span className={channelDescription.length > 250 ? 'text-red-400' : ''}>
                    {channelDescription.length}/250
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Channel Preview */}
          {channelName && isChannelNameValid && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-white">Channel Preview</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">{channelName}</span>
                </div>
                {channelDescription && (
                  <p className="text-xs text-gray-400 ml-6">{channelDescription}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <ActionButtons
            onCancel={closeModal}
            loading={loading}
            onSubmitLabel="Create Channel"
            submittingLabel="Creating..."
            showIcon
            icon={<Hash className="w-4 h-4" />}
            disabled={!isChannelNameValid || !channelName.trim()}
          />
        </form>
      </div>
    </Modal>
  );
};
