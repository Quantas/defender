package com.quantasnet.defender.dependency;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

interface DependencyStatusRepository extends JpaRepository<DependencyStatus, Long>, JpaSpecificationExecutor<DependencyStatus> {
    DependencyStatus findByStatus(String status);
}
