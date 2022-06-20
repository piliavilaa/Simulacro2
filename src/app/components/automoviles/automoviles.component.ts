import { Component, OnInit } from '@angular/core';
import { Automovil } from '../../models/automoviles';
import { AutomovilesService } from '../../services/automoviles.service';

@Component({
  selector: 'app-automoviles',
  templateUrl: './automoviles.component.html',
  styleUrls: ['./automoviles.component.css'],
})
export class AutomovilesComponent implements OnInit {
  automoviles: Automovil[] = [];

  constructor(private servicioAutomoviles: AutomovilesService) {}

  ngOnInit() {
    this.listado();
  }

  listado() {
    this.servicioAutomoviles.get().subscribe((res: Automovil[]) => {
      this.automoviles = res;
    });
  }

  buscar() {
    const marcaAutomovil = document.getElementById('Mar') as HTMLInputElement;
    this.servicioAutomoviles
      .getMarca(marcaAutomovil.value)
      .subscribe((res: Automovil[]) => {
        this.automoviles = res;
      });
  }
}
