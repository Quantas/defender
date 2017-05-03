package com.quantasnet.defender.app;

import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/apps")
@RestController
public class AppController {

    private AppService appService;
    private BuildService buildService;

    public AppController(final AppService appService, final BuildService buildService) {
        this.appService = appService;
        this.buildService = buildService;
    }

    @GetMapping
    public List<App> apps() {
        return appService.all();
    }

    @GetMapping("/{id}")
    public App one(@PathVariable final long id) {
        return appService.one(id);
    }

    @GetMapping("/{id}/builds")
    public List<Build> builds(@PathVariable final long id) {
        final App app = appService.one(id);
        return buildService.appBuilds(app);
    }

}
