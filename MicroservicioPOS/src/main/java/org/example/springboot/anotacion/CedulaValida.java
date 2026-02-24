package org.example.springboot.anotacion;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.example.springboot.validadores.CedulaValidador;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CedulaValidador.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CedulaValida {
    String message() default "La cédula no es valida.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
