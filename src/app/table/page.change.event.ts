import { CurrentSort } from './sort.type';

export interface PageChangeEvent {
  pageNo: number;
  sorts?: CurrentSort[];
  sortString?: string;
}
