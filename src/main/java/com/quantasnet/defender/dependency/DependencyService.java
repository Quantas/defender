package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class DependencyService {

    private static final Logger LOG = LoggerFactory.getLogger(DependencyService.class);

    private final DependencyRepository dependencyRepository;

    public DependencyService(final DependencyRepository dependencyRepository) {
        this.dependencyRepository = dependencyRepository;
    }

    public List<Dependency> all() {
        return this.dependencyRepository.findAllByOrderByGroupIdAscArtifactIdAsc();
    }

    public Page<Dependency> paged(final int pageNo) {
        final PageRequest pageRequest = new PageRequest(pageNo, 20, Sort.Direction.ASC, "groupId", "artifactId", "version");
        return dependencyRepository.findAll(pageRequest);
    }

    public Dependency one(final long id) {
        return dependencyRepository.findOne(id);
    }

    public Dependency retrieve(final String groupId, final String artifactId, final String version, final DefenderType type, final String user) {
        final Dependency existing = dependencyRepository.findDistinctByGroupIdAndArtifactIdAndVersionAndType(groupId, artifactId, version, type);

        if (null == existing) {
            final Dependency newDep = new Dependency();
            newDep.setGroupId(groupId);
            newDep.setArtifactId(artifactId);
            newDep.setVersion(version);
            newDep.setType(type);
            newDep.setDependencyStatus(DependencyStatus.NEW);

            final DependencyHistory history = new DependencyHistory();
            history.setUser(user);
            history.setNewValue(DependencyStatus.NEW);
            history.setTime(OffsetDateTime.now());

            final List<DependencyHistory> histories = new ArrayList<>();
            histories.add(history);

            newDep.setDependencyHistories(histories);

            LOG.info("New Dependency Found: {}", newDep);

            return dependencyRepository.save(newDep);
        }

        return existing;
    }

    @Transactional
    public Dependency changeStatus(final DependencyStatus newStatus, final long id, final String user) {
        final Dependency dep = dependencyRepository.findOne(id);
        if (null != dep) {
            // get
            dep.getDependencyHistories().size();
            final DependencyStatus oldStatus = dep.getDependencyStatus();

            if (oldStatus == newStatus) {
                return null;
            }

            dep.setDependencyStatus(newStatus);

            final DependencyHistory history = new DependencyHistory();
            history.setUser(user);
            history.setOldValue(oldStatus);
            history.setNewValue(newStatus);
            history.setTime(OffsetDateTime.now());

            dep.getDependencyHistories().add(history);

            dep.getDependencyHistories().sort(Comparator.comparing(DependencyHistory::getTime).reversed());

            return dependencyRepository.save(dep);
        }

        return null;
    }
}
