import type { ReactNode } from 'react';
import { EmojiInput } from './Input/EmojiInput';

type Option = { value: string; text: string };

type Props = {
  label?: string | ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disableError?: boolean;
  type?: 'text' | 'emoji' | 'sms_code' | 'select';
  options?: Option[];
};

export const Input: React.FC<Props> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disableError,
  options,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            n-input-text
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        );
      case 'emoji':
        return <EmojiInput value={value} onChange={onChange} />;
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="h-36px"
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        );
      case 'sms_code':
        return (
          <div flex gap-x-16px>
            <input
              shrink-1
              j-input-text
              type="text"
              placeholder={placeholder}
              max-w="[calc(40%-8px)]"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <button max-w="[calc(60%-8px)]" shrink-0 j-btn>
              发送验证码
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div flex flex-col gap-y-8px>
      {label && <span text-18px>{label}</span>}
      {renderInput()}
      {!disableError && <span text-red text-12px>{error || '　'}</span>}
    </div>
  );
};
