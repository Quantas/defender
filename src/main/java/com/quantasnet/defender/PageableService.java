package com.quantasnet.defender;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public abstract class PageableService<T, ID extends Serializable, R extends JpaRepository<T, ID> & JpaSpecificationExecutor<T>> {

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    protected final R repository;

    public PageableService(final R repository) {
        this.repository = repository;
    }

    public long count() {
        return repository.count();
    }

    public T one(final ID id) {
        return repository.findById(id).get();
    }

    public T save(final T entity) {
        return repository.save(entity);
    }

    public PageWrapper<T> pagedAndOrFiltered(final int pageNo, final String sort, final String filter, final DefenderSpecification<T> spec) {
        final Page<T> page;

        if (null == filter) {
            page = repository.findAll(createPageRequest(pageNo, sort));
        } else {
            page = repository.findAll(spec, createPageRequest(pageNo, sort));
        }

        return new PageWrapper<>(page);
    }

    private PageRequest createPageRequest(final int pageNo, final String sort) {
        final PageRequest pageRequest;

        if (null == sort) {
            pageRequest = PageRequest.of(pageNo, 20);
        } else {
            final String[] columns = sort.split(";");
            final List<Sort.Order> orders = new ArrayList<>();

            for (String column : columns) {
                if (!StringUtils.isEmpty(column)) {
                    final Sort.Direction dir;
                    if (column.startsWith("-")) {
                        dir = Sort.Direction.DESC;
                        column = column.substring(1);
                    } else {
                        dir = Sort.Direction.ASC;
                    }

                    orders.add(new Sort.Order(dir, column));
                }
            }

            pageRequest = PageRequest.of(pageNo, 20, Sort.by(orders));
        }

        return pageRequest;
    }

}
