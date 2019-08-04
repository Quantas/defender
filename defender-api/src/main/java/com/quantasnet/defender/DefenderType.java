package com.quantasnet.defender;

import java.util.Arrays;

public enum DefenderType {
    MAVEN,
    NODE,

    UNKNOWN;

    public static final String HEADER_NAME = "X-DEFENDER-TYPE";

    private static final DefenderType[] VALUES = values();

    public static DefenderType convert(final String typeString) {
        return Arrays
                .stream(DefenderType.VALUES)
                .filter(value -> value.name().equals(typeString))
                .findAny()
                .orElse(DefenderType.UNKNOWN);
    }
}
