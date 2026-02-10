package org.example.microserviciopos.controller;

import org.example.microserviciopos.dto.ClienteDTO;
import org.example.microserviciopos.mapper.ClienteMapper;
import org.example.microserviciopos.model.Cliente;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.microserviciopos.service.ServicioCliente;

import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:5173")
public class ControllerCliente {

    private final ServicioCliente servicioCliente;
    private final ClienteMapper clienteMapper;

    public ControllerCliente(ServicioCliente servicioCliente, ClienteMapper clienteMapper) {
        this.servicioCliente = servicioCliente;
        this.clienteMapper = clienteMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClienteDTO>> all(){
        return ResponseEntity.ok(servicioCliente.findAll().stream()
                .map(clienteMapper::clienteToClienteDTO).toList()
        );
    }

    @PostMapping("/create")
    public ResponseEntity<ClienteDTO> create(@RequestBody ClienteDTO clienteDTO){
        Cliente cliente = clienteMapper.clienteDTOToCliente(clienteDTO);
        return  ResponseEntity.status(HttpStatus.CREATED)
                .body(clienteMapper.clienteToClienteDTO(servicioCliente.create(cliente)));
    }
}
