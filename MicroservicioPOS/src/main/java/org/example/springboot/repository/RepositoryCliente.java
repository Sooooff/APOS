package org.example.springboot.repository;

import org.example.springboot.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RepositoryCliente extends JpaRepository<Cliente, UUID> {
}
