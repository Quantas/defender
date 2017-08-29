package com.quantasnet.defender;

public enum DefenderType {
    MAVEN,
    NODE,

    UNKNOWN;

    public static final String HEADER_NAME = "X-DEFENDER-TYPE";
}
