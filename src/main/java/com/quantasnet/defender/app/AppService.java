package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderType;
import com.quantasnet.defender.PageableService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class AppService extends PageableService<App, Long, AppRepository> {

    public AppService(final AppRepository appRepository) {
        super(appRepository);
    }

    public App retrieve(final String groupId, final String artifactId, final DefenderType type) {
        final App existing = repository.findDistinctByGroupIdAndArtifactIdAndType(groupId, artifactId, type);

        if (null == existing) {
            final App app = new App();
            app.setGroupId(groupId);
            app.setArtifactId(artifactId);
            app.setType(type);
            logger.info("New app = {}", app);
            return repository.save(app);
        }

        return existing;
    }
}
