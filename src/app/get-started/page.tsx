'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isUrl, pattern } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ArrowDropdown, Hash, Home, MoreHoriz } from '@/components/icons';
import { RailButton } from '@/components/rail-button';
import { SidebarButton } from '@/modules/sidebar/ui/sibebar-button';
import { TextField } from '@/components/ui/text-field';
import { Tags } from '@/components/ui/tags';
import { AlertCircle, Check } from 'lucide-react';

type FieldErrors = {
  workspaceName?: string;
  channelName?: string;
  imageUrl?: string;
  [key: string]: string | undefined;
};

type FieldTouched = {
  workspaceName?: boolean;
  channelName?: boolean;
  imageUrl?: boolean;
  [key: string]: boolean | undefined;
};

const GetStarted = () => {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState('');
  const [channelName, setChannelName] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<FieldTouched>({});

  // Enhanced field validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'workspaceName':
        return value.trim().length < 2 ? 'Workspace name must be at least 2 characters' : '';
      case 'channelName':
        return value.trim().length < 1 ? 'Channel name is required' : '';
      case 'imageUrl':
        return value && (!isUrl(value) || !RegExp(pattern).test(value))
          ? 'Please enter a valid image URL (png, jpg, jpeg, gif, svg)'
          : '';
      default:
        return '';
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    switch (name) {
      case 'workspaceName':
        setWorkspaceName(value);
        break;
      case 'channelName':
        setChannelName(value.toLowerCase());
        break;
      case 'imageUrl':
        setImageUrl(value);
        break;
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const allFieldsValid = Boolean(
    workspaceName.trim().length >= 2 &&
      channelName.trim().length >= 1 &&
      (!imageUrl || (isUrl(imageUrl) && RegExp(pattern).test(imageUrl))) &&
      emails.length > 0 &&
      Object.values(errors).every((error) => !error),
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors: FieldErrors = {};
    newErrors.workspaceName = validateField('workspaceName', workspaceName);
    newErrors.channelName = validateField('channelName', channelName);
    newErrors.imageUrl = validateField('imageUrl', imageUrl);

    setErrors(newErrors);
    setTouched({ workspaceName: true, channelName: true, imageUrl: true });

    if (!allFieldsValid || Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/workspaces/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceName: workspaceName.trim(),
          channelName: channelName.trim(),
          emails,
          imageUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const { workspace, channel } = result;
        router.push(`/client/${workspace.id}/${channel.id}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating workspace:', error);
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const getFieldStatus = (fieldName: string) => {
    if (!touched[fieldName]) return null;
    return errors[fieldName] ? 'error' : 'success';
  };

  return (
    <div className="client font-lato w-screen h-screen flex flex-col bg-[#0F0F0F]">
      {/* Enhanced gradient background */}
      <div className="absolute w-full h-full bg-gradient-to-b from-[#1A1D21] to-[#0F0F0F]" />

      {/* Top bar */}
      <div className="relative w-full h-10 flex items-center justify-between pr-1" />

      <div className="w-screen h-[calc(100svh-40px)] grid grid-cols-[70px_auto]">
        {/* Enhanced sidebar rail */}
        <div className="hidden relative w-[4.375rem] sm:flex flex-col items-center overflow-hidden gap-3 pt-3 z-[1000] bg-[#1A1D21]/80 backdrop-blur-sm">
          <div className="w-9 h-9 mb-2 transition-transform hover:scale-105">
            <Avatar
              width={36}
              borderRadius={8}
              fontSize={20}
              fontWeight={600}
              data={{ name: workspaceName || 'WS', image: imageUrl }}
            />
          </div>
          <div className="relative flex flex-col items-center w-[3.25rem] gap-1">
            <div className="relative">
              <RailButton title="Home" icon={<Home color="var(--primary)" filled />} active />
            </div>
            <div className="relative opacity-40 hover:opacity-70 transition-opacity">
              <RailButton title="More" icon={<MoreHoriz color="var(--primary)" />} />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="relative w-svw h-full sm:h-auto sm:w-auto flex mr-1 mb-1 rounded-lg overflow-hidden border border-[#2F3136] shadow-2xl ml-2">
          {/* Enhanced sidebar */}
          <div className="hidden w-[280px] relative px-3 sm:flex flex-col flex-shrink-0 gap-4 min-w-0 min-h-0 max-h-[calc(100svh-44px)] bg-[#1A1D21]/95 backdrop-blur border-r border-[#2F3136]">
            <div className="pl-1 w-full h-[52px] flex items-center justify-between border-b border-[#2F3136]/50">
              <div className="max-w-[calc(100%-80px)]">
                <div className="w-fit max-w-full rounded-lg py-2 px-3 flex items-center text-white hover:bg-[#2F3136] transition-colors cursor-pointer">
                  <span className="truncate text-[18px] font-bold leading-tight">
                    {workspaceName || 'New Workspace'}
                  </span>
                </div>
              </div>
            </div>

            {channelName && (
              <div className="w-full flex flex-col gap-2">
                <div className="h-8 -ml-1 flex items-center px-3 text-[15px] text-[#9CA3AF]">
                  <button className="hover:bg-[#2F3136] rounded-md p-1 transition-colors">
                    <ArrowDropdown color="var(--icon-gray)" />
                  </button>
                  <button className="flex px-2 max-w-full rounded-md text-[#9CA3AF] font-medium hover:bg-[#2F3136] transition-colors">
                    Channels
                  </button>
                </div>
                <div className="ml-2">
                  <SidebarButton icon={Hash} title={channelName} />
                </div>
              </div>
            )}
          </div>

          {/* Enhanced main form area */}
          <div className="bg-[#0F1419] grow p-8 sm:p-12 lg:p-16 flex flex-col overflow-y-auto">
            <div className="max-w-[720px] flex flex-col gap-8">
              {/* Enhanced header */}
              <div className="space-y-3">
                <h1 className="font-sans font-bold text-[42px] sm:text-[48px] lg:text-[52px] leading-tight text-white">
                  Create your workspace
                </h1>
                <p className="text-[#9CA3AF] text-lg leading-relaxed max-w-[600px]">
                  Set up your team&apos;s digital workspace. Add members and start collaborating in
                  minutes.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Enhanced form fields */}
                <div className="space-y-5">
                  <div className="relative">
                    <TextField
                      label="Workspace name"
                      name="workspaceName"
                      value={workspaceName}
                      onChange={(e) => handleFieldChange('workspaceName', e.target.value)}
                      onBlur={() => handleFieldBlur('workspaceName')}
                      placeholder="e.g., Acme Corporation"
                      required
                      className={`transition-all ${
                        getFieldStatus('workspaceName') === 'error'
                          ? 'border-red-500 focus:border-red-500'
                          : getFieldStatus('workspaceName') === 'success'
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                    />
                    {touched.workspaceName && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        {errors.workspaceName ? (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-500">{errors.workspaceName}</span>
                          </>
                        ) : (
                          workspaceName.trim().length >= 2 && (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-green-500">Looks good!</span>
                            </>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <TextField
                      label={
                        <span className="flex items-center gap-2">
                          Workspace image
                          <span className="text-[#6B7280] text-sm font-normal">(optional)</span>
                        </span>
                      }
                      name="workspaceImage"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                      onBlur={() => handleFieldBlur('imageUrl')}
                      placeholder="https://example.com/logo.png"
                      pattern={pattern}
                      title='Image URL must start with "http://" or "https://" and end with ".png", ".jpg", ".jpeg", ".gif", or ".svg"'
                      className={`transition-all ${
                        getFieldStatus('imageUrl') === 'error'
                          ? 'border-red-500 focus:border-red-500'
                          : getFieldStatus('imageUrl') === 'success'
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                    />
                    {touched.imageUrl && imageUrl && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        {errors.imageUrl ? (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-500">{errors.imageUrl}</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">Valid image URL</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <TextField
                      label="Channel name"
                      name="channelName"
                      value={channelName}
                      onChange={(e) => handleFieldChange('channelName', e.target.value)}
                      onBlur={() => handleFieldBlur('channelName')}
                      placeholder="general"
                      maxLength={80}
                      required
                      className={`transition-all ${
                        getFieldStatus('channelName') === 'error'
                          ? 'border-red-500 focus:border-red-500'
                          : getFieldStatus('channelName') === 'success'
                          ? 'border-green-500 focus:border-green-500'
                          : ''
                      }`}
                    />
                    {touched.channelName && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        {errors.channelName ? (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-500">{errors.channelName}</span>
                          </>
                        ) : (
                          channelName.trim().length >= 1 && (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-green-500">Channel name set</span>
                            </>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Enhanced tags component */}
                  <div className="space-y-3">
                    <Tags
                      values={emails}
                      setValues={setEmails}
                      label="Invite team members"
                      placeholder="Enter email addresses and press Enter"
                    />
                    <p className="text-sm text-[#6B7280]">
                      Add your team members&apos; email addresses. They&apos;ll receive an
                      invitation to join your workspace.
                    </p>
                  </div>
                </div>

                {/* Enhanced submit button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={!allFieldsValid || loading}
                    className={`
                      px-8 py-3 text-base font-semibold rounded-lg transition-all duration-200
                      ${
                        allFieldsValid && !loading
                          ? 'bg-[#4A5568] hover:bg-[#2D3748] text-white border-[#4A5568] hover:border-[#2D3748] transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                          : 'bg-gray-600 text-gray-400 border-gray-600 cursor-not-allowed opacity-60'
                      }
                    `}
                    loading={loading}
                  >
                    {'Create workspace'}
                  </Button>

                  {emails.length === 0 && (
                    <p className="mt-3 text-sm text-[#EF4444] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Please add at least one team member to continue
                    </p>
                  )}
                </div>
              </form>

              {/* Progress indicator */}
              <div className="mt-8 pt-6 border-t border-[#2F3136]">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        workspaceName.trim().length >= 2 ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                    <span
                      className={
                        workspaceName.trim().length >= 2 ? 'text-green-400' : 'text-gray-400'
                      }
                    >
                      Workspace name
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        channelName.trim().length >= 1 ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                    <span
                      className={
                        channelName.trim().length >= 1 ? 'text-green-400' : 'text-gray-400'
                      }
                    >
                      Channel name
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        emails.length > 0 ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                    <span className={emails.length > 0 ? 'text-green-400' : 'text-gray-400'}>
                      Team members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
