package com.quantasnet.defender.build;

import org.springframework.data.jpa.repository.JpaRepository;

interface BuildDependencyRepository extends JpaRepository<BuildDependency, Long> {
}
