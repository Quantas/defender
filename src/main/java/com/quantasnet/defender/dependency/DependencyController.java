package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderController;
import com.quantasnet.defender.PageWrapper;
import com.quantasnet.defender.build.BuildService;
import com.quantasnet.defender.build.BuildWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
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
    public Dependency changeStatus(@PathVariable final String newStatus, @PathVariable final long id) {
        // TODO user auth
        return service.changeStatus(newStatus, id, "webuser");
    }

    @GetMapping("/{id}/builds/{pageNo}")
    public PageWrapper<BuildWrapper> builds(@PathVariable final long id, @PathVariable final int pageNo) {
        final Dependency dependency = service.one(id);
        return buildService.findByDependency(dependency, pageNo);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException.class)
    public String entityNotFound() {
        return "Not Found";
    }
}
