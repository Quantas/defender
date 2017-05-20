package com.quantasnet.defender.build;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RequestMapping("/api/builds")
@RestController
public class BuildController {

    private final BuildService buildService;

    public BuildController(final BuildService buildService) {
        this.buildService = buildService;
    }

    @GetMapping("/count")
    public long count() {
        return buildService.count();
    }

    @GetMapping("/page/{pageNo}")
    public Page<Build> buildsPaged(@PathVariable final Integer pageNo, @RequestParam(required = false) final String sort, @RequestParam(required = false) final String filter) {
        return buildService.pagedAndOrFiltered(pageNo, sort, filter, new BuildSpecification(filter));
    }

    /**
     * Transactional and .size() here get the child data
     *
     * @param id
     * @return
     */
    @Transactional
    @GetMapping("/{id}")
    public Build getBuild(@PathVariable final long id) {
        final Build build = buildService.findOne(id);

        if (build != null) {
            build.getBuildDependencies().size();
        }

        return build;
    }
}
