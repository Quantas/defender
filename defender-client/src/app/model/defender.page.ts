import { Page } from 'shark-ng-table';

export interface DefenderPage<T> extends Page {
  content?: T[];
}
