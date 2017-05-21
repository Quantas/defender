package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderController;
import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RequestMapping("/api/dependencies")
@RestController
public class DependencyController extends DefenderController<Dependency, Long, DependencyRepository, DependencyService> {

    private final BuildService buildService;

    public DependencyController(final DependencyService dependencyService, final BuildService buildService) {
        super(dependencyService, DependencySpecification.class);
        this.buildService = buildService;
    }

    /**
     * Transactional and .size() here get the child data
     *
     * @param id
     * @return
     */
    @Transactional
    @GetMapping("/{id}")
    public Dependency one(@PathVariable final long id) {
        final Dependency dependency = service.one(id);
        if (null != dependency) {
            dependency.getDependencyHistories().size();
        }
        return dependency;
    }

    @PostMapping("/{id}/{newStatus}")
    public Dependency changeStatus(@PathVariable final DependencyStatus newStatus, @PathVariable final long id) {
        // TODO user auth
        return service.changeStatus(newStatus, id, "webuser");
    }

    @GetMapping("/{id}/builds/{pageNo}")
    public Page<Build> builds(@PathVariable final long id, @PathVariable final int pageNo) {
        final Dependency dependency = service.one(id);
        return buildService.findByDependency(dependency, pageNo);
    }
}
