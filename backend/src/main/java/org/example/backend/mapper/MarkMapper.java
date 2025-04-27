package org.example.backend.mapper;

import org.example.backend.dto.MarkDto;
import org.example.backend.model.Mark;
import org.springframework.stereotype.Component;


@Component
public class MarkMapper {

    public MarkDto toDto(Mark mark) {
        if (mark == null) {
            return null;
        }
        MarkDto dto = new MarkDto();
        dto.setId(mark.getId());
        dto.setName(mark.getName());
        return dto;
    }

    public Mark toEntity(MarkDto dto) {
        if (dto == null) {
            return null;
        }
        Mark mark = new Mark();
        mark.setName(dto.getName());
        return mark;
    }

    public void updateEntity(Mark mark, MarkDto dto) {
        if (dto == null || mark == null) {
            return;
        }
        mark.setName(dto.getName());
    }
}