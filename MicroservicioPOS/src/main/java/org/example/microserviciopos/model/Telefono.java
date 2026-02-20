package org.example.microserviciopos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Telefono extends EntityBase {

    @Column(name = "numero_telefono", nullable = false)
    private String numeroTelefono;

    @Column(nullable = false)
    private String tipo; // Casa, Móvil, Oficina, etc.
    //TO - Do - hacer enum con los tipos de telefono

    @ManyToOne
    @JoinColumn(name = "persona_id", nullable = false)
    private Persona persona;
}
