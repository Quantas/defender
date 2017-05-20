package com.quantasnet.defender.dependency;

import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RequestMapping("/api/dependencies")
@RestController
public class DependencyController {

    private final DependencyService dependencyService;
    private final BuildService buildService;

    public DependencyController(final DependencyService dependencyService, final BuildService buildService) {
        this.dependencyService = dependencyService;
        this.buildService = buildService;
    }

    @GetMapping("/count")
    public long count() {
        return dependencyService.count();
    }

    @GetMapping({ "/page/{pageNo}", "/page" })
    public Page<Dependency> dependenciesPaged(@PathVariable final Integer pageNo, @RequestParam(required = false) final String sort, @RequestParam(required = false) final String filter) {
        return dependencyService.pagedAndOrFiltered(pageNo, sort, filter, new DependencySpecification(filter));
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
        final Dependency dependency = dependencyService.one(id);
        if (null != dependency) {
            dependency.getDependencyHistories().size();
        }
        return dependency;
    }

    @PostMapping("/{id}/{newStatus}")
    public Dependency changeStatus(@PathVariable final DependencyStatus newStatus, @PathVariable final long id) {
        // TODO user auth
        return dependencyService.changeStatus(newStatus, id, "webuser");
    }

    @GetMapping("/{id}/builds/{pageNo}")
    public Page<Build> builds(@PathVariable final long id, @PathVariable final int pageNo) {
        final Dependency dependency = dependencyService.one(id);
        return buildService.findByDependency(dependency, pageNo);
    }
}
