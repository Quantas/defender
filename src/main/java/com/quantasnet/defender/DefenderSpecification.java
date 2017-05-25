package com.quantasnet.defender;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public abstract class DefenderSpecification<T> implements Specification<T> {

    private final String filterOriginal;
    private final String filter;
    private final String[] fields;

    public DefenderSpecification(final String filter, final String... fields) {
        this.filterOriginal = filter;
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
                addPredicate(cb, predicates, childJoin, split[1]);
            } else {
                addPredicate(cb, predicates, root, field);
            }
        }

        predicate.getExpressions().addAll(predicates);

        return predicate;
    }

    private void addPredicate(CriteriaBuilder cb, List<Predicate> predicates, From<?, ?> from, String field) {
        final Path<?> child = from.get(field);

        if (Enum.class.isAssignableFrom(child.getJavaType())) {
            try {
                final Object obj = child.getJavaType().getMethod("valueOf", String.class).invoke(null, filterOriginal);
                if (null != obj) {
                    predicates.add(cb.equal(from.get(field), obj));
                }
            } catch (final Exception e) {
            }
        } else {
            predicates.add(cb.like(from.get(field), filter));
        }
    }
}
