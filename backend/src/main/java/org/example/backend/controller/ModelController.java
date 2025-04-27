package org.example.backend.controller;

import org.example.backend.dto.ModelDto;
import org.example.backend.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/model")
public class ModelController {

    @Autowired
    private ModelService modelService;

    @GetMapping
    public ResponseEntity<List<ModelDto>> getAllModels() {
        List<ModelDto> models = modelService.getAllModels();
        return ResponseEntity.ok(models);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelDto> getModelById(@PathVariable Long id) {
        ModelDto model = modelService.getModelById(id);
        return model != null ? ResponseEntity.ok(model) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ModelDto> createModel(@RequestBody ModelDto modelDto) {
        ModelDto createdModel = modelService.createModel(modelDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelDto> updateModel(@PathVariable Long id, @RequestBody ModelDto modelDto) {
        ModelDto updatedModel = modelService.updateModel(id, modelDto);
        return updatedModel != null ? ResponseEntity.ok(updatedModel) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModel(@PathVariable Long id) {
        modelService.deleteModel(id);
        return ResponseEntity.noContent().build();
    }
}
