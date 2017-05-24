package com.quantasnet.defender.build;

import com.quantasnet.defender.PageableService;
import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildService extends PageableService<Build, Long, BuildRepository> {

    private BuildRepository buildRepository;

    public BuildService(final BuildRepository buildRepository) {
        super(buildRepository);
        this.buildRepository = buildRepository;
    }

    @Cacheable("builds")
    public Build findOne(final Long id) {
        return one(id);
    }

    public List<Build> recent() {
        return buildRepository.findFirst10ByOrderByBuildTimeDesc();
    }

    public Page<Build> appBuilds(final App app, final int pageNo) {
        final PageRequest pageRequest = new PageRequest(pageNo, 20, Sort.Direction.DESC, "buildTime");
        return repository.findByApp(app, pageRequest);
    }

    public Page<Build> findByDependency(final Dependency dependency, final int pageNo) {
        final PageRequest pageRequest = new PageRequest(pageNo, 20, Sort.Direction.DESC, "buildTime");
        return repository.findAllByBuildDependenciesDependency(dependency, pageRequest);
    }
}
