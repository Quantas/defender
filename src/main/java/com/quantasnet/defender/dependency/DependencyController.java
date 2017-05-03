package com.quantasnet.defender.dependency;

import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/dependencies")
@RestController
public class DependencyController {

    private final DependencyService dependencyService;
    private final BuildService buildService;

    public DependencyController(final DependencyService dependencyService, final BuildService buildService) {
        this.dependencyService = dependencyService;
        this.buildService = buildService;
    }

    @GetMapping
    public List<Dependency> dependencies() {
        return dependencyService.all();
    }

    @GetMapping("/{id}")
    public Dependency one(@PathVariable final long id) {
        return dependencyService.one(id);
    }

    @GetMapping("/{id}/builds")
    public List<Build> builds(@PathVariable final long id) {
        final Dependency dependency = dependencyService.one(id);
        return buildService.findByDependency(dependency);
    }
}
