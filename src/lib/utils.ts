import crypto from 'crypto';
import { customAlphabet } from 'nanoid';

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const pattern = `(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`;

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
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = num % 10;
  const suffix = suffixes[lastDigit] || 'th';
  return num + suffix;
};

export { isUrl, isEmail, getOrdinalSuffix, pattern };
