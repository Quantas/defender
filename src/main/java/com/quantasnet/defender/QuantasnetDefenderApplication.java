package com.quantasnet.defender;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;

import java.util.HashSet;
import java.util.Set;

@EnableCaching
@SpringBootApplication
public class QuantasnetDefenderApplication {

	/**
	 * Don't throw exceptions for lazy collections in Jackson Mapping
	 *
	 * @return
	 */
	@Bean
	public Module datatypeHibernateModule() {
		return new Hibernate5Module();
	}

	@Bean
	public ConversionService conversionService() {
		final ConversionServiceFactoryBean bean = new ConversionServiceFactoryBean();
		final Set<Converter<?, ?>> converters = new HashSet<>();

		converters.add(new DefenderTypeConverter());

		bean.setConverters(converters);
		bean.afterPropertiesSet();
		return bean.getObject();
	}

	public static void main(String[] args) {
		SpringApplication.run(QuantasnetDefenderApplication.class, args);
	}
}
