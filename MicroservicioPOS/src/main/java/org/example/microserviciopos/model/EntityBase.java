package org.example.microserviciopos.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
public abstract class EntityBase {
    @Id
    @UuidGenerator
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private UUID id;

    @Column(nullable = false)
    private Boolean activo = true;

    public UUID getId() {
        return id;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
