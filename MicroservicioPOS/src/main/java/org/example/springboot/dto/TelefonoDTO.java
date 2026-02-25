package org.example.springboot.dto;

public record TelefonoDTO(
        String numero,
        String tipo,
        Boolean activo
) {
}
