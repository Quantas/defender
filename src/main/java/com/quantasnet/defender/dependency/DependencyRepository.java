package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderRepository;
import com.quantasnet.defender.DefenderType;

interface DependencyRepository extends DefenderRepository<Dependency, Long> {
    Dependency findDistinctByGroupIdAndArtifactIdAndVersionAndType(String groupId, String artifactId, String version, DefenderType type);
}
