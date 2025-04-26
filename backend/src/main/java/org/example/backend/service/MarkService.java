package org.example.backend.service;

import org.example.backend.dto.MarkDto;

import java.util.List;

public interface MarkService {
    List<MarkDto> getAllMarks();
    MarkDto getMarkById(Long id);
    MarkDto createMark(MarkDto markDto);
    MarkDto updateMark(Long id, MarkDto markDto);
    void deleteMark(Long id);

}
