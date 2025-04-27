package org.example.backend.mapper;

import org.example.backend.dto.TypeDto;
import org.example.backend.dto.VehicleDto;
import org.example.backend.model.Type;
import org.example.backend.model.Vehicle;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TypeMapper {

    private final VehicleMapper vehicleMapper;

    public TypeMapper(VehicleMapper vehicleMapper) {this.vehicleMapper = vehicleMapper;}

    public TypeDto toDto(Type type) {
        if (type == null) {
            return null;
        }
        TypeDto dto = new TypeDto();
        dto.setId(type.getId());
        dto.setName(type.getName());

        return dto;
    }

    public Type toEntity(TypeDto dto) {
        if (dto == null) {
            return null;
        }
        Type type = new Type();
        type.setName(dto.getName());

        return type;
    }

    public void updateEntity(Type type, TypeDto dto) {
        if (dto == null || type == null) {
            return;
        }
        type.setName(dto.getName());

    }
}