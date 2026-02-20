package org.example.microserviciopos.mapper;

import org.example.microserviciopos.dto.ClienteDTO;
import org.example.microserviciopos.model.Cliente;
import org.example.microserviciopos.model.Telefono;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(
        componentModel = "spring",
        uses = {TelefonoMapper.class}
)
public abstract class ClienteMapper {

    @Autowired
    protected TelefonoMapper telefonoMapper;

    public abstract ClienteDTO clienteToClienteDTO(Cliente entity);

    @Mapping(target = "telefonos", ignore = true)
    @Mapping(target = "activo", constant = "true")
    public abstract Cliente clienteDTOToCliente(ClienteDTO dto);

    @AfterMapping
    protected void linkTelefonos(
            ClienteDTO dto,
            @MappingTarget Cliente cliente
    ) {
        if (dto.telefonos() != null) {
            dto.telefonos().forEach(t -> {
                Telefono telefono = telefonoMapper.TelefonoDTOToTelefono(t);
                cliente.addTelefono(telefono);
            });
        }
    }
}
