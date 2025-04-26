package org.example.backend.controller;

import org.example.backend.dto.MarkDto;
import org.example.backend.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mark")
public class MarkController {

    @Autowired
    private MarkService markService;

    @GetMapping
    public ResponseEntity<List<MarkDto>> getAllMarks() {
        List<MarkDto> marks = markService.getAllMarks();
        return ResponseEntity.ok(marks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarkDto> getMarkById(@PathVariable Long id) {
        MarkDto mark = markService.getMarkById(id);
        return mark != null ? ResponseEntity.ok(mark) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MarkDto> createMark(@RequestBody MarkDto markDto) {
        MarkDto createdMark = markService.createMark(markDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMark);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarkDto> updateMark(@PathVariable Long id, @RequestBody MarkDto markDto) {
        MarkDto updatedMark = markService.updateMark(id, markDto);
        return updatedMark != null ? ResponseEntity.ok(updatedMark) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMark(@PathVariable Long id) {
        markService.deleteMark(id);
        return ResponseEntity.noContent().build();
    }
}
