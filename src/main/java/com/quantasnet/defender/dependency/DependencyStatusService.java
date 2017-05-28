package com.quantasnet.defender.dependency;

import com.quantasnet.defender.PageableService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class DependencyStatusService extends PageableService<DependencyStatus, Long, DependencyStatusRepository> {

    public static final String NEW = "New";
    public static final String APPROVED = "Approved";
    public static final String INSECURE = "Insecure";
    public static final String DEPRECATED = "Deprecated";
    public static final String BANNED = "Banned";


    public DependencyStatusService(final DependencyStatusRepository dependencyStatusRepository) {
        super(dependencyStatusRepository);
    }

    @PostConstruct
    public void postConstruct() {
        final long count = repository.count();

        // Setup DB
        if (count == 0) {
            save(NEW, false);
            save(APPROVED, true);
            save(INSECURE, false);
            save(DEPRECATED, true);
            save(BANNED, false);
        }
    }

    @Cacheable("dependencyStatus")
    public DependencyStatus getByStatus(final String status) {
        return repository.findByStatus(status);
    }

    private DependencyStatus save(final String status, final boolean approved) {
        final DependencyStatus dependencyStatus = new DependencyStatus();
        dependencyStatus.setStatus(status);
        dependencyStatus.setApproved(approved);
        return repository.save(dependencyStatus);
    }

}
