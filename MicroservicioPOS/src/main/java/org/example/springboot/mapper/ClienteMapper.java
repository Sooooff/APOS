package org.example.springboot.mapper;


import org.example.springboot.dto.ClienteDTO;
import org.example.springboot.model.Cliente;
import org.example.springboot.model.Telefono;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.ArrayList;
import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {TelefonoMapper.class}
)
public interface ClienteMapper {
    ClienteDTO clienteToClienteDTO(Cliente entity);

    @Mapping(target = "activo", constant = "true")
    Cliente clienteDTOToCliente(ClienteDTO dto);

    @AfterMapping
    default void linkTelefonos(@MappingTarget Cliente cliente) {

        if (cliente.getTelefonos() == null || cliente.getTelefonos().isEmpty()) {
            return;
        }

        //cambiar el nombre de "copia"
        List<Telefono> copia = new ArrayList<>(cliente.getTelefonos());
        cliente.getTelefonos().clear();

        copia.forEach(cliente::addTelefono);
    }
}
