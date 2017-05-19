package com.quantasnet.defender.dependency;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.OffsetDateTime;

@Entity
public class DependencyHistory {

    @Id
    @GeneratedValue
    private Long id;

    private String userId;
    private OffsetDateTime time;
    private DependencyStatus oldValue;
    private DependencyStatus newValue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserID() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public OffsetDateTime getTime() {
        return time;
    }

    public void setTime(OffsetDateTime time) {
        this.time = time;
    }

    public DependencyStatus getOldValue() {
        return oldValue;
    }

    public void setOldValue(DependencyStatus oldValue) {
        this.oldValue = oldValue;
    }

    public DependencyStatus getNewValue() {
        return newValue;
    }

    public void setNewValue(DependencyStatus newValue) {
        this.newValue = newValue;
    }
}
