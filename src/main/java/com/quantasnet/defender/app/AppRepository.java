package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

interface AppRepository extends JpaRepository<App, Long>, JpaSpecificationExecutor<App> {
    App findDistinctByGroupIdAndArtifactIdAndType(String groupId, String artifactId, DefenderType type);
}
