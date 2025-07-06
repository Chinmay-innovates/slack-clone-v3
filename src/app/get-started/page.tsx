'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { isUrl, pattern } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Hash, Home, MoreHoriz } from '@/components/icons';
import { RailButton } from '@/components/rail-button';
import { SidebarButton } from '@/modules/sidebar/ui/sibebar-button';
import { TextField } from '@/components/ui/text-field';
import { Tags } from '@/components/ui/tags';

import { FIELD_CONFIG, FIELD_VALIDATORS, FieldKey } from './types';

const GetStarted = () => {
  const router = useRouter();
  const [fields, setFields] = useState<Record<FieldKey, string>>({
    workspaceName: '',
    channelName: '',
    imageUrl: '',
  });
  const [emails, setEmails] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<FieldKey, string>>({
    workspaceName: '',
    channelName: '',
    imageUrl: '',
  });
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    workspaceName: false,
    channelName: false,
    imageUrl: false,
  });
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);
  const handleChange = (name: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: FIELD_VALIDATORS[name](value) }));
  };

  const handleBlur = (name: FieldKey) => setTouched((prev) => ({ ...prev, [name]: true }));

  const allValid =
    fields.workspaceName.trim().length >= 2 &&
    fields.channelName.trim().length >= 1 &&
    (!fields.imageUrl || (isUrl(fields.imageUrl) && RegExp(pattern).test(fields.imageUrl))) &&
    emails.length > 0 &&
    Object.values(errors).every((e) => !e);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = Object.fromEntries(
      (Object.entries(fields) as [FieldKey, string][]).map(([k, v]) => [k, FIELD_VALIDATORS[k](v)]),
    ) as Record<FieldKey, string>;
    setErrors(newErrors);
    setTouched({ workspaceName: true, channelName: true, imageUrl: true });
    if (!allValid || Object.values(newErrors).some(Boolean)) return;

    try {
      setLoading(true);
      const res = await fetch('/api/workspaces/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, channelName: fields.channelName.trim(), emails }),
      });
      const result = await res.json();
      if (res.ok) router.push(`/client/${result.workspace.id}/${result.channel.id}`);
      else alert(`Error: ${result.error}`);
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  const renderValidation = (field: FieldKey, message: string, condition: boolean) =>
    touched[field] && (
      <div className="mt-2 flex items-center gap-2 text-sm">
        {message ? (
          <>
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-500">{message}</span>
          </>
        ) : (
          condition && (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-500">Looks good!</span>
            </>
          )
        )}
      </div>
    );

  if (!hasMounted) return null;

  return (
    <div className="client font-lato min-h-screen min-w-full overflow-hidden bg-[#0F0F0F]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1D21] to-[#0F0F0F]" />
      <div className="relative z-10 w-full h-10 flex items-center justify-between pr-1" />

      <div className="relative z-10 w-full h-[calc(100svh-40px)] grid grid-cols-[70px_auto] overflow-hidden">
        <aside className="hidden sm:flex flex-col items-center pt-3 z-[1000] bg-[#1A1D21]/80 w-[4.375rem] overflow-hidden">
          <Avatar
            width={36}
            borderRadius={8}
            fontSize={20}
            fontWeight={600}
            data={{ name: fields.workspaceName || 'WS', image: fields.imageUrl }}
          />
          <RailButton title="Home" icon={<Home color="var(--primary)" filled />} active />
          <RailButton title="More" icon={<MoreHoriz color="var(--primary)" />} />
        </aside>

        <main className="relative flex overflow-hidden border border-[#2F3136] ml-2 rounded-lg">
          <div className="hidden sm:flex flex-col w-[280px] bg-[#1A1D21]/95 border-r border-[#2F3136] px-3 overflow-hidden">
            <div className="h-[52px] flex items-center border-b border-[#2F3136]/50">
              <span className="text-white font-bold text-[18px] truncate">
                {fields.workspaceName || 'New Workspace'}
              </span>
            </div>
            {fields.channelName && <SidebarButton icon={Hash} title={fields.channelName} />}
          </div>

          <section className="bg-[#0F1419] grow p-8 sm:p-12 lg:p-16 overflow-y-auto overflow-x-hidden">
            <div className="max-w-[720px] flex flex-col gap-8">
              <header className="space-y-3">
                <h1 className="font-sans font-bold text-[48px] text-white">
                  Create your workspace
                </h1>
                <p className="text-[#9CA3AF] text-lg">
                  Set up your team&apos;s digital workspace. Add members and start collaborating in
                  minutes.
                </p>
              </header>

              <form onSubmit={onSubmit} className="space-y-6">
                {(Object.keys(FIELD_CONFIG) as FieldKey[]).map((key) => (
                  <div key={key} className="relative">
                    <TextField
                      label={FIELD_CONFIG[key].label}
                      name={key}
                      type={FIELD_CONFIG[key].type}
                      value={fields[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      onBlur={() => handleBlur(key)}
                      placeholder={FIELD_CONFIG[key].placeholder}
                      required={FIELD_CONFIG[key].required}
                    />
                    {renderValidation(
                      key,
                      errors[key],
                      fields[key].trim().length > (key === 'workspaceName' ? 1 : 0),
                    )}
                  </div>
                ))}

                <div className="space-y-3">
                  <Tags
                    values={emails}
                    setValues={setEmails}
                    label="Invite team members"
                    placeholder="Enter email addresses and press Enter"
                  />
                  <p className="text-sm text-[#6B7280]">
                    Add email addresses. They&apos;ll get an invite.
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={!allValid || loading}
                    className={`px-8 py-3 font-semibold rounded-lg ${
                      allValid && !loading
                        ? 'bg-[#4A5568] hover:bg-[#2D3748] text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    loading={loading}
                  >
                    Create workspace
                  </Button>
                  {!emails.length && (
                    <p className="mt-3 text-sm text-amber-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Add at least one team member
                    </p>
                  )}
                </div>
              </form>

              <footer className="mt-8 pt-6 border-t border-[#2F3136] text-sm">
                {(['workspaceName', 'channelName'] as FieldKey[]).map((k) => (
                  <div key={k} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        fields[k].trim().length ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                    <span className={fields[k].trim().length ? 'text-green-400' : 'text-gray-400'}>
                      {k.replace('Name', ' name')}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      emails.length ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  />
                  <span className={emails.length ? 'text-green-400' : 'text-gray-400'}>
                    Team members
                  </span>
                </div>
              </footer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default GetStarted;
