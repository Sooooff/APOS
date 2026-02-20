package org.example.microserviciopos.dto;

import java.util.List;
import java.util.UUID;

public record ClienteDTO(
        UUID id,
        String primerNombre,
        String primerApellido,
        String segundoNombre,
        String segundoApellido,
        String email,
        List<TelefonoDTO> telefonos,
        Boolean activo
) {
}
