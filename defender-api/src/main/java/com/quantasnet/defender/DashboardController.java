package com.quantasnet.defender;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class DashboardController {

    private final List<DefenderController<?,?,?,?>> controllers;

    public DashboardController(final List<DefenderController<?,?,?,?>> controllers) {
        this.controllers = controllers;
    }

    @GetMapping("/api/dashboard/stats")
    public List<Stat> stats(@AuthenticationPrincipal Principal principal) {
        return controllers
                .stream()
                .map(controller -> new Stat(controller.getDisplayName(), Long.toString(controller.count())))
                .collect(Collectors.toList());
    }

    public static class Stat {
        private final String name;
        private final String count;

        public Stat(String name, String count) {
            this.name = name;
            this.count = count;
        }

        public String getName() {
            return name;
        }

        public String getCount() {
            return count;
        }
    }
}

