package com.quantasnet.defender.build;

import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface BuildRepository extends JpaRepository<Build, Long> {
    List<Build> findByApp(App app);

    List<Build> findAllByBuildDependenciesDependency(Dependency dependency);
}
