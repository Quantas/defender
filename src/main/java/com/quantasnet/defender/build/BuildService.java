package com.quantasnet.defender.build;

import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class BuildService {

    private final BuildRepository buildRepository;

    public BuildService(final BuildRepository buildRepository) {
        this.buildRepository = buildRepository;
    }

    public Build save(final Build build) {
        return buildRepository.save(build);
    }

    public Page<Build> paged(final int pageNo) {
        final PageRequest pageRequest = new PageRequest(pageNo, 20, Sort.Direction.ASC, "buildTime", "app.groupId", "app.artifactId");
        return buildRepository.findAll(pageRequest);
    }

    @Cacheable("builds")
    public Build findOne(final Long id) {
        return buildRepository.findOne(id);
    }

    public Page<Build> appBuilds(final App app, final int pageNo) {
        final PageRequest pageRequest = new PageRequest(pageNo, 20, Sort.Direction.DESC, "buildTime");
        return buildRepository.findByApp(app, pageRequest);
    }

    public Page<Build> findByDependency(final Dependency dependency, final int pageNo) {
        final PageRequest pageRequest = new PageRequest(pageNo, 20, Sort.Direction.DESC, "buildTime");
        return buildRepository.findAllByBuildDependenciesDependency(dependency, pageRequest);
    }
}
