package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderRepository;

interface DependencyStatusRepository extends DefenderRepository<DependencyStatus, Long> {
    DependencyStatus findByStatusIgnoreCase(String status);
}
