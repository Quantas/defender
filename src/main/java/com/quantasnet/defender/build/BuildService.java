package com.quantasnet.defender.build;

import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildService {

    private final BuildRepository buildRepository;

    public BuildService(final BuildRepository buildRepository) {
        this.buildRepository = buildRepository;
    }

    public Build save(final Build build) {
        return buildRepository.save(build);
    }

    public List<Build> findAll() {
        return buildRepository.findAll();
    }

    public Build findOne(final Long id) {
        return buildRepository.findOne(id);
    }

    public List<Build> appBuilds(final App app) {
        return buildRepository.findByApp(app);
    }

    public List<Build> findByDependency(final Dependency dependency) {
        return buildRepository.findAllByBuildDependenciesDependency(dependency);
    }
}
