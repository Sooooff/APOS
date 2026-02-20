package org.example.microserviciopos.mapper;

import org.example.microserviciopos.dto.TelefonoDTO;
import org.example.microserviciopos.model.Telefono;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TelefonoMapper {
    TelefonoDTO telefonoToTelefonoDTO(Telefono entity);

    @Mapping(target = "activo", constant = "true")
    Telefono TelefonoDTOToTelefono(TelefonoDTO dto);
}
