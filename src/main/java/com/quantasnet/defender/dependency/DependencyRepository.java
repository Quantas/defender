package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;
import org.springframework.data.jpa.repository.JpaRepository;

interface DependencyRepository extends JpaRepository<Dependency, Long> {
    Dependency findDistinctByGroupIdAndArtifactIdAndVersionAndType(String groupId, String artifactId, String version, DefenderType type);
}
