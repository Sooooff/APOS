package org.example.springboot.service;

import jakarta.transaction.Transactional;
import org.example.springboot.mapper.ClienteMapper;
import org.example.springboot.model.Cliente;
import org.springframework.stereotype.Service;
import org.example.springboot.repository.RepositoryCliente;

@Service
public class ServicioCliente extends GenericService<Cliente,RepositoryCliente> {

    private final ClienteMapper clienteMapper;
    private final RepositoryCliente clienteRepository;

    public ServicioCliente(RepositoryCliente repository, ClienteMapper clienteMapper) {
        super(repository);
        this.clienteRepository = repository;
        this.clienteMapper = clienteMapper;
    }

    @Override
    @Transactional
    public Cliente create(Cliente cliente) {
        Cliente guardado = clienteRepository.saveAndFlush(cliente);
        // Recargar la entidad guardada para asegurar que las colecciones e IDs generados están inicializados
        return clienteRepository.findById(guardado.getId()).orElse(guardado);
    }
}
