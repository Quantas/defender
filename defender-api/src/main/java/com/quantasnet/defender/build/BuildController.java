package com.quantasnet.defender.build;

import com.quantasnet.defender.DefenderController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RequestMapping("/api/builds")
@RestController
public class BuildController extends DefenderController<Build, Long, BuildRepository, BuildService> {

    private final BuildService buildService;

    public BuildController(final BuildService buildService) {
        super(buildService, BuildSpecification.class);

        this.buildService = buildService;
    }

    @Override
    public String getDisplayName() {
        return "Builds";
    }

    @GetMapping("/recent")
    public List<Build> findRecent() {
        return buildService.recent();
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
