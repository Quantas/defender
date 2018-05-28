import { Dependency } from './dependency';
import { DependencyStatus } from './dependency.status';

export class BuildDependency {
  id: number;
  dependency: Dependency;
  dependencyStatus: DependencyStatus;
  scope: string;
  transitive: boolean;
}
