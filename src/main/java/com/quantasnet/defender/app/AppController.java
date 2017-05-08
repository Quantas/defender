package com.quantasnet.defender.app;

import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/apps")
@RestController
public class AppController {

    private AppService appService;
    private BuildService buildService;

    public AppController(final AppService appService, final BuildService buildService) {
        this.appService = appService;
        this.buildService = buildService;
    }

    @GetMapping("/count")
    public long count() {
        return appService.count();
    }

    @GetMapping("/page/{pageNo}")
    public Page<App> apps(@PathVariable final int pageNo) {
        return appService.all(pageNo);
    }

    @GetMapping("/{id}")
    public App one(@PathVariable final long id) {
        return appService.one(id);
    }

    @GetMapping("/{id}/builds/{pageNo}")
    public Page<Build> builds(@PathVariable final long id, @PathVariable final int pageNo) {
        final App app = appService.one(id);
        return buildService.appBuilds(app, pageNo);
    }

}
