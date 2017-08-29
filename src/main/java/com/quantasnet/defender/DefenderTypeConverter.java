package com.quantasnet.defender;

import org.springframework.core.convert.converter.Converter;

public class DefenderTypeConverter implements Converter<String, DefenderType> {

    private static final DefenderType[] VALUES = DefenderType.values();

    @Override
    public DefenderType convert(final String typeString) {
        for (final DefenderType type : VALUES) {
            if (type.name().equals(typeString)) {
                return type;
            }
        }

        return DefenderType.UNKNOWN;
    }

}
