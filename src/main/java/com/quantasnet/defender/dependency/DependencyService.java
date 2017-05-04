package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

            final Set<DependencyHistory> histories = new HashSet<>();
            histories.add(history);

            newDep.setDependencyHistories(histories);

            LOG.info("New Dependency Found: {}", newDep);

            return dependencyRepository.save(newDep);
        }

        return existing;
    }
}
