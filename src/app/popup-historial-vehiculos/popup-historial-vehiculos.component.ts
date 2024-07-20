import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Carro } from '../carro';
import { ListaHistorialComponent } from '../lista-historial/lista-historial.component';
import { CarroService } from '../carro.service';

@Component({
  selector: 'app-popup-historial-vehiculos',
  templateUrl: './popup-historial-vehiculos.component.html',
  styleUrl: './popup-historial-vehiculos.component.css'
})
export class PopupHistorialVehiculosComponent {


  @ViewChild(ListaHistorialComponent) listaHistoriachildComponent!: ListaHistorialComponent; // Acceso al componente hijo
  constructor(private carroServicio:CarroService) {}



  ngOnChanges(changes: SimpleChanges) {
    if(this.carroSeleccionadoDetalles != undefined) {
      const id=this.carroSeleccionadoDetalles.id;
      this.carroServicio.obtenerCarroPorId(id).subscribe(c => {
      this.carroSeleccionadoDetalles = c;
  });
  console.log(this.carroSeleccionadoDetalles);
 }
}

  tituloPopUp :string = 'Historial';
  modalLabel = 'historialModalLabel';
  idModal: string = 'verHistorialPopUp';
  mostrarListaHistorial: boolean = true; // o false según la condición
  mostrarRegistrarHistorial: boolean = false; // o false según la condición
  historialActualizado = false;

  
  @Input() carroSeleccionadoDetalles: Carro;
  //Objeto auxiliar
  carro:Carro;


 addHistory() {
  // Cambiar las propiedades cuando se guarde el historial
  this.mostrarListaHistorial = false;
  this.mostrarRegistrarHistorial = true;
}

actualizarCarro() {
    const id=this.carroSeleccionadoDetalles.id;
    this.carroServicio.obtenerCarroPorId(id).subscribe(c => {
    this.carroSeleccionadoDetalles = c;
});
}

cleanInitMethod() {
  this.mostrarListaHistorial = true;
  this.mostrarRegistrarHistorial = false;

  if(this.carroSeleccionadoDetalles != undefined) {
   this.actualizarCarro();


  }
}

private obtenerCarroPorId(id: number) {
  this.carroServicio.obtenerCarroPorId(id).subscribe(c => {
    this.carro = c;
  });
}

  }

