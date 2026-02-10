package org.example.microserviciopos.service;

import org.example.microserviciopos.model.Cliente;
import org.springframework.stereotype.Service;
import org.example.microserviciopos.repository.RepositoryCliente;

@Service
public class ServicioCliente extends GenericService<Cliente,RepositoryCliente> {

  protected ServicioCliente(RepositoryCliente repository) {super(repository);}
}
