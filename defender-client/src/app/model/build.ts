import { App } from './app';
import { BuildDependency } from './build.dependency';

export class Build {
  id: number;
  app?: App;
  version: string;
  userName: string;
  buildTime: string;
  passed: boolean;
  buildDependencies?: BuildDependency[];
}
