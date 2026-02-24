package org.example.springboot.mapper;

import org.example.springboot.dto.TelefonoDTO;
import org.example.springboot.model.Telefono;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TelefonoMapper {

    /*@Mapping(target = "id", source = "id")
    @Mapping(target = "numero", source = "numeroTelefono")*/
    TelefonoDTO telefonoToTelefonoDTO(Telefono entity);

    //@Mapping(target = "numeroTelefono", source = "numero")
    @Mapping(target = "activo", constant = "true")
    @Mapping(target = "persona", ignore = true)
    Telefono TelefonoDTOToTelefono(TelefonoDTO dto);
}
