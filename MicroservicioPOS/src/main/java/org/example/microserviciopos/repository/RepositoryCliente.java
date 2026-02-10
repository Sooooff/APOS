package org.example.microserviciopos.repository;

import org.example.microserviciopos.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RepositoryCliente extends JpaRepository<Cliente, UUID> {
}
