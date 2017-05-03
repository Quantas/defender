package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderType;
import org.springframework.data.jpa.repository.JpaRepository;

interface AppRepository extends JpaRepository<App, Long> {
    App findDistinctByGroupIdAndArtifactIdAndType(String groupId, String artifactId, DefenderType type);
}
