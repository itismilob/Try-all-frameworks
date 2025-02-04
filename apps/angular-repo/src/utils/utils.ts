export function isValidArray(arr: any[]): boolean {
  return Array.isArray(arr) && arr[0];
}

import { contentType, commentType } from 'types';
import { format } from 'date-fns';

export function getFormattedDate(content: contentType | commentType): string {
  return format(content.date, 'yyyy/MM/dd');
}
