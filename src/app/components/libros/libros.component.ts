import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Libro } from '../../models/libros';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  constructor(
    private servicioLibros: LibrosService,
    private formBuilder: FormBuilder
  ) {}
  libros: Libro[] = [];

  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC = 'L';
  submitted = false;
  Titulo = 'Libros';
  FormRegistro: FormGroup;
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  ngOnInit() {
    this.listado();
    this.ConstruirForms();
  }

  ConstruirForms() {
    this.FormRegistro = this.formBuilder.group({
      Id: null,
      Titulo: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      Stock: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('[0-9]{4}'),
        ],
      ],
      Activo: [null, [Validators.required]],
    });
  }

  listado() {
    this.servicioLibros.get().subscribe((res: Libro[]) => {
      this.libros = res;
    });
  }

  Modificar(libro: Libro) {
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
    this.FormRegistro.patchValue(libro)
    this.AccionABMC = 'M';

  }

  Volver() {
    this.AccionABMC = 'L';
  }

  Agregar() {}

  Delete(id: number) {}

  Grabar() {
    let libroAModificar: Libro = this.FormRegistro.value;

    if (this.AccionABMC == 'M') {
      // modificar put
      this.servicioLibros.put(libroAModificar).subscribe((libro: Libro) => {
        this.Volver();
        alert('Registro modificado correctamente.');
        this.listado();
      });
    }
  }
}
