package org.example.backend.service;

import org.example.backend.dto.TypeDto;

import java.util.List;

public interface TypeService {
    List<TypeDto> getAllTypes();
    TypeDto getTypeById(Long id);
    TypeDto createType(TypeDto typeDto);
    TypeDto updateType(Long id, TypeDto typeDto);
    void deleteType(Long id);
}
