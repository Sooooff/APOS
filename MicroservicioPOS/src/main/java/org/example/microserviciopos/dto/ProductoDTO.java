package org.example.microserviciopos.dto;

import org.example.microserviciopos.enums.UnidadMedida;

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
