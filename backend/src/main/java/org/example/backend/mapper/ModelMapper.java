package org.example.backend.mapper;

import org.example.backend.dto.ModelDto;
import org.example.backend.dto.VehicleDto;
import org.example.backend.model.Mark;
import org.example.backend.model.Model;
import org.example.backend.model.Vehicle;
import org.example.backend.repository.MarkRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ModelMapper {

    private final MarkRepository markRepository;

    public ModelMapper(MarkRepository markRepository) {this.markRepository = markRepository;}

    public ModelDto toDto(Model model) {
        if (model == null) {
            return null;
        }
        ModelDto dto = new ModelDto();
        dto.setId(model.getId());
        dto.setName(model.getName());
        if (model.getMark() != null) {
            dto.setMarkId(model.getMark().getId());
        } else {
            dto.setMarkId(null);
        }
        return dto;
    }

    public Model toEntity(ModelDto dto) {
        if (dto == null) {
            return null;
        }
        Model model = new Model();
        model.setName(dto.getName());
        if (dto.getMarkId() != null) {
            Mark mark = markRepository.findById(dto.getMarkId()).orElse(null);
            if (mark != null) {
                model.setMark(mark);
            }
        }
        return model;
    }

    public void updateEntity(Model model, ModelDto dto) {
        if (dto == null || model == null) {
            return;
        }
        model.setName(dto.getName());
        if (dto.getMarkId() != null) {
            Mark mark = markRepository.findById(dto.getMarkId()).orElse(null);
            if (mark != null) {
                model.setMark(mark);
            }
        }
    }
}
