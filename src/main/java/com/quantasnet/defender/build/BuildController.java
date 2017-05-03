package com.quantasnet.defender.build;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api/builds")
public class BuildController {

    private final BuildService buildService;

    public BuildController(final BuildService buildService) {
        this.buildService = buildService;
    }

    @GetMapping
    public List<Build> builds() {
        return buildService.findRecent();
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
