import { Component, Input } from '@angular/core';
import { Carro } from '../carro';

@Component({
  selector: 'app-popup-imagenes-zoom',
  templateUrl: './popup-imagenes-zoom.component.html',
  styleUrl: './popup-imagenes-zoom.component.css'
})
export class PopupImagenesZoomComponent {

  @Input() carroSeleccionadoDetalles: Carro;
  @Input() imagenescodificadasFront : any [];


  ngOnInit(): void {
    this.carroSeleccionadoDetalles = new Carro();
 }

}
