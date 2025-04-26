package org.example.backend.model;

import org.example.backend.model.Model;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "mark")
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "mark", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Model> models = new ArrayList<>();

}
