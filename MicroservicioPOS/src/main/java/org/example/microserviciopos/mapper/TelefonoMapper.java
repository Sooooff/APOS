package org.example.microserviciopos.mapper;

import org.example.microserviciopos.dto.TelefonoDTO;
import org.example.microserviciopos.model.Telefono;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TelefonoMapper {

    @Mapping(target = "numero", source = "numeroTelefono")
    TelefonoDTO telefonoToTelefonoDTO(Telefono entity);

    @Mapping(target = "numeroTelefono", source = "numero")
    @Mapping(target = "activo", constant = "true")
    @Mapping(target = "persona", ignore = true)
    Telefono TelefonoDTOToTelefono(TelefonoDTO dto);
}
