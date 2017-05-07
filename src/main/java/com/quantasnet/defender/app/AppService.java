package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {

    private static final Logger LOG = LoggerFactory.getLogger(AppService.class);

    private final AppRepository appRepository;

    public AppService(final AppRepository appRepository) {
        this.appRepository = appRepository;
    }

    public Page<App> all(final int pageNo) {
        final PageRequest pageRequest = new PageRequest(pageNo, 20, Sort.Direction.ASC, "groupId", "artifactId");
        return appRepository.findAll(pageRequest);
    }

    public App one(final long id) {
        return appRepository.findOne(id);
    }

    public App retrieve(final String groupId, final String artifactId, final DefenderType type) {
        final App existing = appRepository.findDistinctByGroupIdAndArtifactIdAndType(groupId, artifactId, type);

        if (null == existing) {
            final App app = new App();
            app.setGroupId(groupId);
            app.setArtifactId(artifactId);
            app.setType(type);
            LOG.info("New app = {}", app);
            return appRepository.save(app);
        }

        return existing;
    }
}
