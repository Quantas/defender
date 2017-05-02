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

    private final BuildRepository buildRepository;

    public BuildController(final BuildRepository buildRepository) {
        this.buildRepository = buildRepository;
    }

    @GetMapping
    public List<Build> builds() {
        return buildRepository.findAll();
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
        final Build build = buildRepository.findOne(id);
        build.getBuildArtifacts().size();
        return build;
    }
}
