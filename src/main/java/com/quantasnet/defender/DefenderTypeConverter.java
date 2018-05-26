package com.quantasnet.defender;

import org.springframework.core.convert.converter.Converter;

public class DefenderTypeConverter implements Converter<String, DefenderType> {

    @Override
    public DefenderType convert(final String typeString) {
        return DefenderType.convert(typeString);
    }

}
