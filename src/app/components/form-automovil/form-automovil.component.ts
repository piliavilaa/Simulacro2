import { Component, OnInit } from '@angular/core';
import { Automovil } from '../../models/automoviles';
import { AutomovilesService } from '../../services/automoviles.service';

@Component({
  selector: 'app-form-automovil',
  templateUrl: './form-automovil.component.html',
  styleUrls: ['./form-automovil.component.css'],
})
export class FormAutomovilComponent implements OnInit {
  constructor(private servicioAutomoviles: AutomovilesService) {}

  ngOnInit() {}

  aceptar() {
    let auto = {
      id: 0,
      Marca: '',
      Anio: 0,
      Usado: true,
    };
    const marcaAutomovil = document.getElementById('Mar') as HTMLInputElement;
    const anio = document.getElementById('anio') as HTMLInputElement;
    var activo = document.getElementById('Usado') as HTMLInputElement;
    var usado = false;

    if (activo.value == 'si') {
      usado = true;
    }
    if (marcaAutomovil.value == '') {
      alert('Falta una marca');
      return;
    }
    if (parseInt(anio.value) == null || parseInt(anio.value) <= 0) {
      alert('El año no es valido');
      return;
    } else {
      this.servicioAutomoviles
        .post(marcaAutomovil.value, parseInt(anio.value), usado)
        .subscribe((res: Automovil) => {
          auto = res;
          console.log(auto);
        });
    }
  }
}
