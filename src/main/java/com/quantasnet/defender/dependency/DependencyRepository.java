package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface DependencyRepository extends JpaRepository<Dependency, Long> {
    Dependency findDistinctByGroupIdAndArtifactIdAndVersionAndType(String groupId, String artifactId, String version, DefenderType type);
    List<Dependency> findAllByOrderByGroupIdAscArtifactIdAsc();
}
