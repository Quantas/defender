package com.quantasnet.defender.build;

import com.quantasnet.defender.PageWrapper;
import com.quantasnet.defender.DefenderService;
import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildService extends DefenderService<Build, Long, BuildRepository> {

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

    public PageWrapper<Build> appBuilds(final App app, final int pageNo) {
        final PageRequest pageRequest = PageRequest.of(pageNo, 20, Sort.Direction.DESC, "buildTime");
        return new PageWrapper<>(repository.findByApp(app, pageRequest));
    }

    public PageWrapper<Build> findByDependency(final Dependency dependency, final int pageNo) {
        final PageRequest pageRequest = PageRequest.of(pageNo, 20, Sort.Direction.DESC, "buildTime");
        return new PageWrapper<>(repository.findAllByBuildDependenciesDependency(dependency, pageRequest));
    }
}
