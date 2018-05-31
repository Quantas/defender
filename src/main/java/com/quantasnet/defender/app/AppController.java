package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderController;
import com.quantasnet.defender.PageWrapper;
import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/apps")
@RestController
public class AppController extends DefenderController<App, Long, AppRepository, AppService> {

    private BuildService buildService;

    public AppController(final AppService appService, final BuildService buildService) {
        super(appService, AppSpecification.class);
        this.buildService = buildService;
    }

    @GetMapping("/{id}")
    public App one(@PathVariable final long id) {
        return service.one(id);
    }

    @GetMapping("/{id}/builds/{pageNo}")
    public PageWrapper<Build> builds(@PathVariable final long id, @PathVariable final int pageNo) {
        final App app = service.one(id);
        return buildService.appBuilds(app, pageNo);
    }

}
