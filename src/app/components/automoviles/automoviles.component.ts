import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Automovil } from '../../models/automoviles';
import { AutomovilesService } from '../../services/automoviles.service';

@Component({
  selector: 'app-automoviles',
  templateUrl: './automoviles.component.html',
  styleUrls: ['./automoviles.component.css'],
})
export class AutomovilesComponent implements OnInit {
  automoviles: Automovil[] = [];
  AccionABMC = 'L';
  submitted = false;
  OpcionesUsado = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];

  FormBusqueda = new FormGroup({
    Marca: new FormControl(''),
  });

  FormAuto = new FormGroup({
    Id: new FormControl(0),
    Marca: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    Anio: new FormControl(null, [
      Validators.required,
      Validators.min(1970),
      Validators.max(2022),
      Validators.pattern('[0-9]{4}'),
    ]),
    Activo: new FormControl(true),
  });

  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  constructor(private servicioAutomoviles: AutomovilesService) {}

  ngOnInit() {
    this.listado();
  }

  listado() {
    this.servicioAutomoviles.get().subscribe((res: Automovil[]) => {
      this.automoviles = res;
    });
  }

  Agregar(libro: Libro) {
    this.AccionABMC = 'M';
  }

  Buscar() {
    this.servicioAutomoviles
      .getMarca(this.FormBusqueda.value.Marca)
      .subscribe((res: Automovil[]) => {
        this.automoviles = res;
      });
  }
  Aceptar() {}
}
