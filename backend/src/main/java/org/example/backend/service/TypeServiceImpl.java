package org.example.backend.service;

import org.example.backend.dto.TypeDto;
import org.example.backend.mapper.TypeMapper;
import org.example.backend.model.Type;
import org.example.backend.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeServiceImpl implements TypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TypeMapper typeMapper;

    public List<TypeDto> getAllTypes() {
        List<Type> types = typeRepository.findAll();
        List<TypeDto> typeDtos = new ArrayList<>();
        for (Type type : types) {
            typeDtos.add(typeMapper.toDto(type));
        }
        return typeDtos;
    }

    public TypeDto getTypeById(Long id) {
        Type type = typeRepository.findById(id).orElse(null);
        return typeMapper.toDto(type);
    }

    public TypeDto createType(TypeDto typeDto) {
        if (typeDto.getId() != null && typeRepository.existsById(typeDto.getId())) {
            return null;
        }
        Type type = typeMapper.toEntity(typeDto);
        Type savedType = typeRepository.save(type);
        return typeMapper.toDto(savedType);
    }


    public TypeDto updateType(Long id, TypeDto typeDto) {
        Type type = typeRepository.findById(id).orElse(null);
        if (type == null) {
            return null;
        }
        typeMapper.updateEntity(type, typeDto);
        Type updatedType = typeRepository.save(type);
        return typeMapper.toDto(updatedType);
    }

    public void deleteType(Long id) {
        typeRepository.deleteById(id);
    }
}