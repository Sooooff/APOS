package org.example.springboot.dto;

import org.example.springboot.enums.UnidadMedida;

import java.util.UUID;

public record ProductoDTO(
        UUID id,
        String codBarraProducto,
        String descripcion,
        Double precioCompra,
        int stockActual,
        int stockMinimo,
        UnidadMedida unidadMedida,
        Boolean activo
) {

}
