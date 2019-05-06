package com.quantasnet.defender;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.stream.Collectors;

public class PageWrapper<T> extends PageImpl<T> {

    private static final long serialVersionUID = 1L;

    private final List<Sort.Order> sorts;

    public PageWrapper(final Page<T> page) {
        super(page.getContent(), page.getPageable(), page.getTotalElements());
        this.sorts = page.getSort().stream().collect(Collectors.toList());
    }

    // Jackson
    public List<Sort.Order> getSorts() {
        return sorts;
    }
}
