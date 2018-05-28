import { DependencyStatus } from './dependency.status';
import { DependencyHistory } from './dependency.history';

export class Dependency {
  id: number;
  groupId: string;
  artifactId: string;
  version: string;
  type: string;
  dependencyStatus: DependencyStatus;
  dependencyHistories: DependencyHistory[];
}
