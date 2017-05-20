package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

interface DependencyRepository extends JpaRepository<Dependency, Long>, JpaSpecificationExecutor<Dependency> {
    Dependency findDistinctByGroupIdAndArtifactIdAndVersionAndType(String groupId, String artifactId, String version, DefenderType type);
}
