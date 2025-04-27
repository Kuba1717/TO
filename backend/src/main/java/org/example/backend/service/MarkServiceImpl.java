package org.example.backend.service;

import org.example.backend.dto.MarkDto;
import org.example.backend.mapper.MarkMapper;
import org.example.backend.model.Mark;
import org.example.backend.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MarkServiceImpl implements MarkService{

    @Autowired
    private MarkRepository markRepository;

    @Autowired
    private MarkMapper markMapper;

    public List<MarkDto> getAllMarks() {
        List<Mark> marks = markRepository.findAll();
        List<MarkDto> markDtos = new ArrayList<>();
        for (Mark mark : marks) {
            markDtos.add(markMapper.toDto(mark));
        }
        return markDtos;
    }

    public MarkDto getMarkById(Long id) {
        Mark mark = markRepository.findById(id).orElse(null);
        return markMapper.toDto(mark);
    }

    public MarkDto createMark(MarkDto markDto) {
        if (markDto.getId() != null && markRepository.existsById(markDto.getId())) {
            return null;
        }
        Mark mark = markMapper.toEntity(markDto);
        Mark savedMark = markRepository.save(mark);
        return markMapper.toDto(savedMark);
    }


    public MarkDto updateMark(Long id, MarkDto markDto) {
        Mark mark = markRepository.findById(id).orElse(null);
        if (mark == null) {
            return null;
        }
        markMapper.updateEntity(mark, markDto);
        Mark updatedMark = markRepository.save(mark);
        return markMapper.toDto(updatedMark);
    }

    public void deleteMark(Long id) {
        markRepository.deleteById(id);
    }
}
