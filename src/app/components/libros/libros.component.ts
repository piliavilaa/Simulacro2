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
  Titulo = 'Libros';
  libros: Libro[] = [];
  AccionABMC = 'L';
  submitted = false;

  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];

  FormLibro = new FormGroup({
    Id: new FormControl(0),
    Titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    Stock: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,7}'),
    ]),
    Activo: new FormControl(true),
  });

  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  constructor(
    private servicioLibros: LibrosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Listado();
  }

  Listado() {
    this.servicioLibros.get().subscribe((res: Libro[]) => {
      this.libros = res;
    });
  }

  Modificar(libro: Libro) {
    this.FormLibro.patchValue(libro);
    this.AccionABMC = 'M';
  }

  Grabar() {
    this.submitted = true;
    if (this.FormLibro.invalid) {
      return;
    }
    this.servicioLibros
      .put(this.FormLibro.value.Id, this.FormLibro.value)
      .subscribe((res: any) => {
        this.Volver();
        //this.modalDialogService.Alert('Registro modificado correctamente.');
        this.Listado();
      });
  }

  Volver() {
    this.AccionABMC = 'L';
  }
}
