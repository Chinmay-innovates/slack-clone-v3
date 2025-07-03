'use client';
import { useState } from 'react';

type Props = {
  initialName: string;
  initialImage?: string;
  initialInvites?: string[];
  onSave: (data: { name: string; image?: string; invites?: string[] }) => void;
  onCancel: () => void;
};

export const WorkspaceForm = ({
  initialName,
  initialImage = '',
  initialInvites = [],
  onSave,
  onCancel,
}: Props) => {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [invites, setInvites] = useState<string[]>(initialInvites);
  const [newEmail, setNewEmail] = useState('');

  const addEmail = () => {
    if (newEmail.trim() && !invites.includes(newEmail.trim())) {
      setInvites((prev) => [...prev, newEmail.trim()]);
      setNewEmail('');
    }
  };

  const removeEmail = (email: string) => {
    setInvites((prev) => prev.filter((e) => e !== email));
  };

  return (
    <div className="p-4 border border-gray-600 bg-[#1A1D21] rounded-lg w-[320px] space-y-4">
      <div>
        <label className="text-sm text-white block mb-1">Workspace Name</label>
        <input
          className="w-full bg-[#0F0F0F] border border-gray-700 rounded px-3 py-2 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm text-white block mb-1">Image URL</label>
        <input
          className="w-full bg-[#0F0F0F] border border-gray-700 rounded px-3 py-2 text-white"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-white block mb-1">Pending Invitations</label>
        <div className="flex items-center gap-2 mb-2">
          <input
            className="flex-1 bg-[#0F0F0F] border border-gray-700 rounded px-3 py-2 text-white"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter email"
          />
          <button onClick={addEmail} className="text-sm px-2 py-1 bg-primary text-white rounded">
            Add
          </button>
        </div>
        <ul className="text-sm text-white space-y-1">
          {invites.map((email) => (
            <li key={email} className="flex justify-between items-center">
              <span>{email}</span>
              <button
                onClick={() => removeEmail(email)}
                className="text-red-400 hover:text-red-600 text-xs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          Cancel
        </button>
        <button
          onClick={() => onSave({ name, image, invites })}
          className="bg-primary text-white px-4 py-1 rounded hover:bg-primary-dark"
        >
          Save
        </button>
      </div>
    </div>
  );
};
