package org.example.springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@Getter
@Setter

public class Cliente extends Persona
{
    //TO DO - muchas personas pueden tener dos correo
    @Email(message="El correo no tiene el formato indicado")
    private String email;

    // Hereda la colección de telefonos y los métodos auxiliares desde Persona
    // Evitar redeclarar 'telefonos' aquí para no ocultar la colección gestionada por JPA

    //agregar categoria cliente
}
