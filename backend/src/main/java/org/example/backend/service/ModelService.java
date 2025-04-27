package org.example.backend.service;

import org.example.backend.dto.ModelDto;

import java.util.List;

public interface ModelService {
    List<ModelDto> getAllModels();
    ModelDto getModelById(Long id);
    ModelDto createModel(ModelDto modelDto);
    ModelDto updateModel(Long id, ModelDto modelDto);
    void deleteModel(Long id);
}
