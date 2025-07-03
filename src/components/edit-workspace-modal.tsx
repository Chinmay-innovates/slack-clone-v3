import { useState, useEffect, FormEvent, useContext } from 'react';
import { X, Plus, Users, Image as ImageIcon, Building2, Mail } from 'lucide-react';
import { Modal } from './modal';
import { AppContext } from '../app/client/layout';
import { isEmail, isUrl, pattern } from '@/lib/utils';
import { TextField } from './ui/text-field';
import { ActionButtons } from './action-buttons';

interface EditWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
}

export const EditWorkspaceModal = ({ open, onClose }: EditWorkspaceModalProps) => {
  const { workspace, setWorkspace } = useContext(AppContext);

  const [workspaceName, setWorkspaceName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [invites, setInvites] = useState<string[]>([]);
  const [newInvite, setNewInvite] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (open && workspace) {
      setWorkspaceName(workspace.name || '');
      setImageUrl(workspace.image || '');

      const emailInvites = workspace.invitations?.map((inv) => inv.email) || [];
      setInvites(emailInvites);
      setErrors([]);
    }
  }, [open, workspace]);

  const addInvite = () => {
    const email = newInvite.trim();
    if (email && email && isEmail(email) && !invites.includes(email)) {
      setInvites([...invites, email]);
      setNewInvite('');
    }
  };

  const handleInviteKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInvite();
    }
  };

  const removeInvite = (email: string) => {
    setInvites(invites.filter((i) => i !== email));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: string[] = [];

    if (workspaceName.trim().length < 2) {
      validationErrors.push('Workspace name must be at least 2 characters');
    }

    if (imageUrl && (!isUrl(imageUrl) || !RegExp(pattern).test(imageUrl))) {
      validationErrors.push('Invalid image URL (must be PNG, JPG, JPEG, GIF, or SVG)');
    }

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      setLoading(true);

      const res = await fetch(`/api/workspaces/${workspace.id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: workspaceName.trim(),
          image: imageUrl.trim(),
          invites,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setWorkspace({
          ...workspace,
          name: workspaceName.trim(),
          image: imageUrl.trim(),
          invitations: result.invitations || workspace.invitations,
        });
        onClose();
      } else {
        setErrors([`Error: ${result.error}`]);
      }
    } catch (error) {
      console.error('Error editing workspace:', error);
      setErrors(['An unexpected error occurred.']);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setWorkspaceName('');
    setImageUrl('');
    setInvites([]);
    setNewInvite('');
    setErrors([]);
    onClose();
  };

  if (!open) return null;

  const isImageValid = isUrl(imageUrl) && RegExp(pattern).test(imageUrl);

  return (
    <Modal open={open} onClose={closeModal} loading={loading} title="Edit workspace">
      <div className="w-full max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Messages - Compact */}
          {errors.length > 0 && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <X className="w-4 h-4" />
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

          {/* Workspace Details - Compact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Workspace Details</h3>
            </div>

            <div className="space-y-4">
              <TextField
                name="workspaceName"
                label="Workspace name"
                placeholder="e.g. Acme Corp"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                required
              />

              <div className="space-y-2">
                <TextField
                  name="workspaceImage"
                  type="url"
                  label={
                    <span className="flex items-center gap-2">
                      <ImageIcon className="w-3 h-3" />
                      Logo URL
                      <span className="text-gray-400 text-xs">(optional)</span>
                    </span>
                  }
                  placeholder="https://example.com/logo.png"
                  pattern={pattern}
                  title="Must be a valid image URL (png, jpg, jpeg, gif, svg)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />

                {/* Compact Image Preview */}
                {imageUrl && (
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    {isImageValid ? (
                      <>
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-10 h-10 object-cover rounded-md border border-gray-600"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-green-400">✓ Preview</p>
                          <p className="text-xs text-gray-400 truncate">Logo looks good!</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-amber-400">⚠ Invalid URL</p>
                          <p className="text-xs text-gray-400">Check format</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Invitations Section - Compact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">Team Invitations</h3>
            </div>

            <div className="space-y-3">
              {/* Add Invitation - Mobile Friendly */}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    value={newInvite}
                    onChange={(e) => setNewInvite(e.target.value)}
                    placeholder="Enter email address"
                    onKeyDown={handleInviteKeyPress}
                    type="email"
                  />
                </div>
                <button
                  type="button"
                  onClick={addInvite}
                  disabled={!newInvite.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Invitation
                </button>
              </div>

              {/* Compact Invitations List */}
              {invites.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-300">Pending ({invites.length})</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {invites.map((email) => (
                      <div
                        key={email}
                        className="flex items-center justify-between p-2 bg-gray-800/30 rounded-md border border-gray-700/30 group hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="w-3 h-3 text-gray-400" />
                          </div>
                          <span className="text-xs text-white truncate">
                            {isEmail(email) ? email : 'Invalid Email ⚠'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeInvite(email)}
                          className="ml-2 p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all duration-200 flex-shrink-0"
                          title="Remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {invites.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <Users className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No pending invitations</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons
            onCancel={closeModal}
            loading={loading}
            disabled={loading}
            onSubmitLabel="Save"
            submittingLabel="Saving..."
          />
        </form>
      </div>
    </Modal>
  );
};
