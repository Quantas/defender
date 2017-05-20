package com.quantasnet.defender;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public abstract class DefenderSpecification<T> implements Specification<T> {

    private final String filter;
    private final String[] fields;

    public DefenderSpecification(final String filter, final String... fields) {
        this.filter = '%' + filter + '%';
        this.fields = fields;
    }

    @Override
    public Predicate toPredicate(final Root<T> root, final CriteriaQuery<?> query, final CriteriaBuilder cb) {
        final Predicate predicate = cb.disjunction();

        final List<Predicate> predicates = new ArrayList<>();

        for (final String field : fields) {
            if (field.contains(".")) {
                final String[] split = field.split("\\.");
                final Join<T, ?> childJoin = root.join(split[0]);

                predicates.add(cb.like(childJoin.get(split[1]), filter));
            } else {
                predicates.add(cb.like(root.get(field), filter));
            }
        }

        predicate.getExpressions().addAll(predicates);

        return predicate;
    }
}
