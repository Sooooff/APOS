package org.example.microserviciopos.service;

import org.example.microserviciopos.model.EntityBase;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.UUID;

public abstract class GenericService <E extends EntityBase,R extends JpaRepository<E, UUID>> {

    protected final R repository;

    protected GenericService(R repository) {
        this.repository = repository;
    }

    public List<E> findAll() {return repository.findAll();}
    public E findById(UUID id){
        return repository.findById(id).orElseThrow(()->
                new RuntimeException("No existe la entidad con id: "+id));
    }
    public E create(E entity) {return repository.save(entity);}
    public E update(UUID id, E entity) {
        E value = findById(id);
        return repository.save(value);
    }

    public void delete(UUID id) {repository.deleteById(id);}
}

