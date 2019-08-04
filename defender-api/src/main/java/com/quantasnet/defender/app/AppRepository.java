package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderRepository;
import com.quantasnet.defender.DefenderType;

interface AppRepository extends DefenderRepository<App, Long> {
    App findDistinctByGroupIdAndArtifactIdAndType(String groupId, String artifactId, DefenderType type);
}
