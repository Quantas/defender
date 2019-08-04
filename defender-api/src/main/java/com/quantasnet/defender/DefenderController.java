package com.quantasnet.defender;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

public abstract class DefenderController<T, ID extends Serializable, R extends DefenderRepository<T, ID>, S extends DefenderService<T, ID, R>> {

    protected final S service;
    private final Class<? extends DefenderSpecification<T>> specClass;

    public DefenderController(final S service, final Class<? extends DefenderSpecification<T>> specClass) {
        this.service = service;
        this.specClass = specClass;
    }

    public abstract String getDisplayName();

    @GetMapping("/count")
    public long count() {
        return service.count();
    }

    @GetMapping("/page/{pageNo}")
    public PageWrapper<T> apps(@PathVariable final int pageNo, @RequestParam(required = false) final String sort, @RequestParam(required = false) final String filter) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, InstantiationException {
        return service.pagedAndOrFiltered(pageNo, sort, filter, specClass.getDeclaredConstructor(String.class).newInstance(filter));
    }

}
