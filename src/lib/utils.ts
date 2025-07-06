import crypto from 'crypto';
import { customAlphabet } from 'nanoid';

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const pattern = `https?:\/\/[^"']*\.(?:png|jpg|jpeg|gif|svg)`;

export function generateWorkspaceId() {
  const nanoid = customAlphabet(alphabet, 7);
  return `TO${nanoid(7)}`;
}

export function generateChannelId() {
  const nanoid = customAlphabet(alphabet, 7);
  return `CO${nanoid(7)}`;
}

const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const isEmail = (str: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(str);
};

const getOrdinalSuffix = (num: number): string => {
  if (num >= 11 && num <= 13) return `${num}th`;
  const lastDigit = num % 10;
  switch (lastDigit) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
};

export { isUrl, isEmail, getOrdinalSuffix, pattern };
