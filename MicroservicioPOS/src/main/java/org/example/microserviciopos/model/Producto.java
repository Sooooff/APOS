package org.example.microserviciopos.model;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.example.microserviciopos.enums.UnidadMedida;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "producto")
@Getter
@Setter

public class Producto extends EntityBase{

    private String codBarraProducto;
    private String descripcion;
    private double precioCompra;
    private int stockActual;
    private int stockMinimo;

    @Enumerated(EnumType.STRING)
    private UnidadMedida unidadMedida;

}
