package org.example.microserviciopos.dto;

import java.util.UUID;


public record TelefonoDTO(
        UUID id,
        String numero,
        String tipo,
        Boolean activo
) {
}
