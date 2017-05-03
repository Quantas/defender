package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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

    public Dependency one(final long id) {
        return dependencyRepository.findOne(id);
    }

    public Dependency retrieve(final String groupId, final String artifactId, final String version, final DefenderType type) {
        final Dependency existing = dependencyRepository.findDistinctByGroupIdAndArtifactIdAndVersionAndType(groupId, artifactId, version, type);

        if (null == existing) {
            final Dependency newDep = new Dependency();
            newDep.setGroupId(groupId);
            newDep.setArtifactId(artifactId);
            newDep.setVersion(version);
            newDep.setType(type);
            newDep.setDependencyStatus(DependencyStatus.NEW);

            LOG.info("New Dependency Found: {}", newDep);

            return dependencyRepository.save(newDep);
        }

        return existing;
    }
}
