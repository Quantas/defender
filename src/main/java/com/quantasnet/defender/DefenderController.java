package com.quantasnet.defender;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

public abstract class DefenderController<T, ID extends Serializable, R extends JpaRepository<T, ID> & JpaSpecificationExecutor<T>, S extends PageableService<T, ID, R>> {

    protected S service;
    protected Class<? extends DefenderSpecification<T>> specClass;

    public DefenderController(final S service, final Class<? extends DefenderSpecification<T>> specClass) {
        this.service = service;
        this.specClass = specClass;
    }

    @GetMapping("/count")
    public long count() {
        return service.count();
    }

    @GetMapping("/page/{pageNo}")
    public Page<T> apps(@PathVariable final int pageNo, @RequestParam(required = false) final String sort, @RequestParam(required = false) final String filter) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, InstantiationException {
        return service.pagedAndOrFiltered(pageNo, sort, filter, specClass.getDeclaredConstructor(String.class).newInstance(filter));
    }

}
