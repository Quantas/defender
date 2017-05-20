package com.quantasnet.defender.build;

import com.quantasnet.defender.app.App;
import com.quantasnet.defender.dependency.Dependency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

interface BuildRepository extends JpaRepository<Build, Long>, JpaSpecificationExecutor<Build> {
    Page<Build> findByApp(App app, Pageable pageable);

    Page<Build> findAllByBuildDependenciesDependency(Dependency dependency, Pageable pageable);
}
