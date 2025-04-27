package org.example.backend.service;

import org.example.backend.dto.ModelDto;
import org.example.backend.mapper.ModelMapper;
import org.example.backend.model.Mark;
import org.example.backend.model.Model;
import org.example.backend.repository.MarkRepository;
import org.example.backend.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModelServiceImpl implements ModelService{

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<ModelDto> getAllModels() {
        List<Model> models = modelRepository.findAll();
        List<ModelDto> modelDtos = new ArrayList<>();
        for (Model model : models) {
            modelDtos.add(modelMapper.toDto(model));
        }
        return modelDtos;
    }

    public ModelDto getModelById(Long id) {
        Model model = modelRepository.findById(id).orElse(null);
        return modelMapper.toDto(model);
    }

    public ModelDto createModel(ModelDto modelDto) {
        if (modelDto.getId() != null && modelRepository.existsById(modelDto.getId())) {
            return null;
        }
        Model model = modelMapper.toEntity(modelDto);
        Model savedModel = modelRepository.save(model);
        return modelMapper.toDto(savedModel);
    }



    public ModelDto updateModel(Long id, ModelDto modelDto) {
        Model model = modelRepository.findById(id).orElse(null);
        if (model == null) {
            return null;
        }
        modelMapper.updateEntity(model, modelDto);
        Model updatedModel = modelRepository.save(model);
        return modelMapper.toDto(updatedModel);
    }

    public void deleteModel(Long id) {
        modelRepository.deleteById(id);
    }
}
