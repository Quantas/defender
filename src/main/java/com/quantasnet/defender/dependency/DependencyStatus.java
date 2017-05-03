package com.quantasnet.defender.dependency;

public enum DependencyStatus {
    NEW(false),
    APPROVED(true),
    DEPRECATED(true),
    INSECURE(false),
    DONT_USE(false);

    private final boolean approved;

    DependencyStatus(final boolean approved) {
        this.approved = approved;
    }

    public boolean isApproved() {
        return approved;
    }
}
