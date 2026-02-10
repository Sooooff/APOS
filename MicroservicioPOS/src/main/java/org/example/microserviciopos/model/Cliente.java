package org.example.microserviciopos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@Getter
@Setter
public class Cliente extends EntityBase
{
    @NotEmpty(message = "El campo no puede estar vacío.")
    private String primerNombre;
    @NotEmpty(message = "El campo no puede estar vacío.")
    private String segundoNombre;
    @NotEmpty(message = "El campo no puede estar vacío.")
    private String primerApellido;
    @NotEmpty(message = "El campo no puede estar vacío.")
    private String segundoApellido;
    @Email(message="El correo no tiene el formato indicado")
    private String email;
}
