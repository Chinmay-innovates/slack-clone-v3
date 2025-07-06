import { isUrl, pattern } from '@/lib/utils';

export const FIELD_VALIDATORS = {
  workspaceName: (val: string) =>
    val.trim().length < 2 ? 'Workspace name must be at least 2 characters' : '',
  channelName: (val: string) => (val.trim().length < 1 ? 'Channel name is required' : ''),
  imageUrl: (val: string) =>
    val && (!isUrl(val) || !RegExp(pattern).test(val)) ? 'Please enter a valid image URL' : '',
} as const;

export const FIELD_CONFIG = {
  workspaceName: {
    label: 'Workspace name',
    type: 'text',
    placeholder: 'e.g. Acme Corp',
    required: true,
  },
  imageUrl: {
    label: (
      <span>
        Workspace image&nbsp;
        <span className="text-sm text-[#6B7280]">(optional)</span>
      </span>
    ),
    type: 'url',
    placeholder: 'https://example.com/logo.png',
    required: false,
  },
  channelName: {
    label: 'Channel name',
    type: 'text',
    placeholder: 'general',
    required: true,
  },
} as const;

export type FieldKey = keyof typeof FIELD_VALIDATORS;
