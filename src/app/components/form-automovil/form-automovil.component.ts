import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-automovil',
  templateUrl: './form-automovil.component.html',
  styleUrls: ['./form-automovil.component.css']
})
export class FormAutomovilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  aceptar(){
    const marcaAutomovil = document.getElementById('Mar') as HTMLInputElement;
    const anio = document.getElementById('anio') as HTMLInputElement;
    var activo = document.getElementById('Usado') as HTMLInputElement;
    var usado = false;
    
    if (activo.value == "si")
    {
      usado = true;
    }

    

    
  }


}
