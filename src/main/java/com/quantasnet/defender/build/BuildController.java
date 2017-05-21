package com.quantasnet.defender.build;

import com.quantasnet.defender.DefenderController;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RequestMapping("/api/builds")
@RestController
public class BuildController extends DefenderController<Build, Long, BuildRepository, BuildService> {

    public BuildController(final BuildService buildService) {
        super(buildService, BuildSpecification.class);
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
        final Build build = service.findOne(id);

        if (build != null) {
            build.getBuildDependencies().size();
        }

        return build;
    }
}
