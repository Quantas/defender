package com.quantasnet.defender;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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

	public static void main(String[] args) {
		SpringApplication.run(QuantasnetDefenderApplication.class, args);
	}
}
