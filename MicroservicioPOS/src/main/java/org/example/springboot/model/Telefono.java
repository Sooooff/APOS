package org.example.springboot.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Telefono extends EntityBase {

    //de prueba
    /*@Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;*/

    @Column(name = "numero", nullable = false)
    private String numero;

    @Column(nullable = false)
    private String tipo; // Casa, Móvil, Oficina, etc.
    //TO - Do - hacer enum con los tipos de telefono

    @ManyToOne
    @JoinColumn(name = "persona_id", nullable = false)
    private Persona persona;


}
