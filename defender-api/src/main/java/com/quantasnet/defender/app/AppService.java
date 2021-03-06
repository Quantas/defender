package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderService;
import com.quantasnet.defender.DefenderType;
import org.springframework.stereotype.Service;

@Service
public class AppService extends DefenderService<App, Long, AppRepository> {

    public AppService(final AppRepository appRepository) {
        super(appRepository);
    }

    public App retrieve(final String groupId, final String artifactId, final DefenderType type, final String description, final String license, final String url, final String repo) {
        final App existing = repository.findDistinctByGroupIdAndArtifactIdAndType(groupId, artifactId, type);

        if (null == existing) {
            final App app = new App();
            app.setGroupId(groupId);
            app.setArtifactId(artifactId);
            app.setType(type);

            app.setDescription(description);
            app.setLicense(license);
            app.setUrl(url);
            app.setRepository(repo);

            logger.info("New app = {}", app);
            return save(app);
        } else {

            existing.setDescription(description);
            existing.setLicense(license);
            existing.setUrl(url);
            existing.setRepository(repo);

            return save(existing);
        }
    }
}
