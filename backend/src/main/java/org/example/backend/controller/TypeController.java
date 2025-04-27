package org.example.backend.controller;

import org.example.backend.dto.TypeDto;
import org.example.backend.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/type")
public class TypeController {

    @Autowired
    private TypeService typeService;

    @GetMapping
    public ResponseEntity<List<TypeDto>> getAllTypes() {
        List<TypeDto> types = typeService.getAllTypes();
        return ResponseEntity.ok(types);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeDto> getTypeById(@PathVariable Long id) {
        TypeDto type = typeService.getTypeById(id);
        return type != null ? ResponseEntity.ok(type) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<TypeDto> createType(@RequestBody TypeDto typeDto) {
        TypeDto createdType = typeService.createType(typeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeDto> updateType(@PathVariable Long id, @RequestBody TypeDto typeDto) {
        TypeDto updatedType = typeService.updateType(id, typeDto);
        return updatedType != null ? ResponseEntity.ok(updatedType) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteType(@PathVariable Long id) {
        typeService.deleteType(id);
        return ResponseEntity.noContent().build();
    }
}
