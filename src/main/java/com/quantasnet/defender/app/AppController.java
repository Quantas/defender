package com.quantasnet.defender.app;

import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
    public Page<App> apps(@PathVariable final int pageNo, @RequestParam(required = false) final String sort) {
        return appService.paged(pageNo, sort);
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
