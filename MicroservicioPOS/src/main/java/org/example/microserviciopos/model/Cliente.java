package org.example.microserviciopos.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cliente")
@Getter
@Setter

public class Cliente extends Persona
{
    //TO DO - muchas personas pueden tener dos correo
    @Email(message="El correo no tiene el formato indicado")
    private String email;

    @OneToMany(
            mappedBy = "persona",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Telefono> telefonos = new ArrayList<>();

    public void addTelefono(Telefono telefono) {
        telefonos.add(telefono);
        telefono.setPersona(this);
    }

    //agregar categoria cliente
}
