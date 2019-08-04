package com.quantasnet.defender.build;

import com.quantasnet.defender.DefenderRepository;
import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

interface BuildRepository extends DefenderRepository<Build, Long> {
    Page<Build> findByApp(App app, Pageable pageable);

    List<Build> findFirst10ByOrderByBuildTimeDesc();

    @Query("SELECT new com.quantasnet.defender.build.BuildWrapper(b.app, b.version, MAX(b.id), MAX(b.buildTime)) FROM Build b JOIN b.buildDependencies bd WHERE bd.dependency = ?1 GROUP BY b.app, b.version")
    Page<BuildWrapper> findAppsForDependency(Dependency dependency, Pageable pageable);
}
