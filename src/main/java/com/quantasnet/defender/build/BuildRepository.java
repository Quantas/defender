package com.quantasnet.defender.build;

import com.quantasnet.defender.DefenderRepository;
import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

interface BuildRepository extends DefenderRepository<Build, Long> {
    Page<Build> findByApp(App app, Pageable pageable);

    List<Build> findFirst10ByOrderByBuildTimeDesc();

    Page<Build> findAllByBuildDependenciesDependency(Dependency dependency, Pageable pageable);
}
