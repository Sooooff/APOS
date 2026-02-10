package org.example.microserviciopos.mapper;

import org.example.microserviciopos.dto.ClienteDTO;
import org.example.microserviciopos.model.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClienteMapper {
    ClienteMapper INSTANCE = Mappers.getMapper(ClienteMapper.class);

     ClienteDTO clienteToClienteDTO(Cliente entity);

     Cliente clienteDTOToCliente(ClienteDTO dto);
}
