package com.quantasnet.defender.protect;

import com.quantasnet.defender.DefenderType;
import com.quantasnet.defender.build.Build;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/protect")
public class ProtectController {

    private final ProtectService protectService;

    public ProtectController(final ProtectService protectService) {
        this.protectService = protectService;
    }

    @PostMapping
    public Build protect(@RequestBody @Valid final ProtectBuild build,
            @RequestHeader(DefenderType.HEADER_NAME) final DefenderType defenderType) {
                return protectService.protect(build, defenderType);
    }
}
