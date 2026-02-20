package org.example.microserviciopos.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)

public abstract class Persona extends EntityBase{

    @Column(nullable = false)
    @NotEmpty (message = "El campo no puede estar vacío.")
    private String primerNombre;

    @Column(nullable = false)
    private String segundoNombre;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "El campo no puede estar vacío.")
    private String primerApellido;

    @Column(nullable = false, unique = true)
    private String segundoApellido;

    // Relación 1 a muchos
    @OneToMany(mappedBy = "persona", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Telefono> telefonos = new ArrayList<>();

    public void addTelefono(Telefono telefono) {
        telefonos.add(telefono);
        telefono.setPersona(this);
    }
}
