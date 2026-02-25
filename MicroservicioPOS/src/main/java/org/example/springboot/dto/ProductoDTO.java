package org.example.springboot.dto;

import org.example.springboot.enums.UnidadMedida;


public record ProductoDTO(

        String codBarraProducto,
        String descripcion,
        Double precioCompra,
        int stockActual,
        int stockMinimo,
        UnidadMedida unidadMedida,
        Boolean activo
) {

}
