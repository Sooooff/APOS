package org.example.microserviciopos.dto;

import java.util.UUID;

public record ClienteDTO(
        UUID id,
        String primerNombre,
        String primerApellido,
        String segundoNombre,
        String segundoApellido,
        String email
) {
}
