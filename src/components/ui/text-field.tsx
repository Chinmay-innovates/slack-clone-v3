import React, { ChangeEventHandler } from 'react';
import clsx from 'clsx';

export interface TextFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: React.ReactNode;
  placeholder: string;
  multiline?: number;
}

export const TextField = ({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  multiline,
  value,
  className,
  ...otherProps
}: TextFieldProps) => {
  const baseInputClasses = clsx(
    'w-full text-white tracking-loose text-[15px] bg-transparent rounded-lg ring-1 ring-inset ring-[#797c8180] outline-none transition-all duration-200 ease-out placeholder:font-normal placeholder:text-[#6b7280] disabled:cursor-default disabled:bg-gray-500 disabled:opacity-50',
    'focus:ring-2 focus:ring-[#1d9bd1] focus:ring-opacity-50 focus:border-[#1d9bd1]',
    'hover:ring-[#9ca3af] hover:ring-opacity-60',
    className,
  );

  const inputClasses = clsx(baseInputClasses, 'h-11 pt-[3px] pb-[5px] px-3');

  const textareaClasses = clsx(baseInputClasses, 'px-3 py-2 leading-[1.46668] resize-none');

  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        {!multiline ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            className={inputClasses}
            required={required}
            {...otherProps}
          />
        ) : (
          <textarea
            name={name}
            value={value}
            onChange={onChange as unknown as ChangeEventHandler<HTMLTextAreaElement>}
            placeholder={placeholder}
            autoComplete="off"
            className={textareaClasses}
            required={required}
            rows={multiline}
            {...(otherProps as React.DetailedHTMLProps<
              React.InputHTMLAttributes<HTMLTextAreaElement>,
              HTMLTextAreaElement
            >)}
          />
        )}
      </div>
    </div>
  );
};
