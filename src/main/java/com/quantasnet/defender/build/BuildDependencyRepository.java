package com.quantasnet.defender.build;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildDependencyRepository extends JpaRepository<BuildDependency, Long> {
}
