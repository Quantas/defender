package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;
import com.quantasnet.defender.PageableService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class DependencyService extends PageableService<Dependency, Long, DependencyRepository> {

    private final DependencyStatusService dependencyStatusService;

    public DependencyService(final DependencyRepository dependencyRepository, final DependencyStatusService dependencyStatusService) {
        super(dependencyRepository);
        this.dependencyStatusService = dependencyStatusService;
    }

    public Dependency retrieve(final String groupId, final String artifactId, final String version, final DefenderType type, final String user) {
        final Dependency existing = repository.findDistinctByGroupIdAndArtifactIdAndVersionAndType(groupId, artifactId, version, type);

        if (null == existing) {
            final DependencyStatus newStatus = dependencyStatusService.getByStatus(DependencyStatusService.NEW);

            final Dependency newDep = new Dependency();
            newDep.setGroupId(groupId);
            newDep.setArtifactId(artifactId);
            newDep.setVersion(version);
            newDep.setType(type);
            newDep.setDependencyStatus(newStatus);

            final DependencyHistory history = new DependencyHistory();
            history.setUserId(user);
            history.setNewValue(newStatus);
            history.setTime(OffsetDateTime.now());

            final List<DependencyHistory> histories = new ArrayList<>();
            histories.add(history);

            newDep.setDependencyHistories(histories);

            logger.info("New Dependency Found: {}", newDep);

            return save(newDep);
        }

        return existing;
    }

    @Transactional
    public Dependency changeStatus(final DependencyStatus newStatus, final long id, final String user) {
        final Dependency dep = one(id);
        if (null != dep) {
            // get
            dep.getDependencyHistories().size();
            final DependencyStatus oldStatus = dep.getDependencyStatus();

            if (oldStatus == newStatus) {
                return null;
            }

            dep.setDependencyStatus(newStatus);

            final DependencyHistory history = new DependencyHistory();
            history.setUserId(user);
            history.setOldValue(oldStatus);
            history.setNewValue(newStatus);
            history.setTime(OffsetDateTime.now());

            dep.getDependencyHistories().add(history);

            dep.getDependencyHistories().sort(Comparator.comparing(DependencyHistory::getTime).reversed());

            return repository.save(dep);
        }

        return null;
    }
}
