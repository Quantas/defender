package com.quantasnet.defender.build;

import com.quantasnet.defender.dependency.Dependency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuildDependencyRepository extends JpaRepository<BuildDependency, Long> {
    List<BuildDependency> findAllByDependency(Dependency dependency);
}
