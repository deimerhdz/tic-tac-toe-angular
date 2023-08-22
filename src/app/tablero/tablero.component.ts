import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugada } from '../interfaces/jugada.interface';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {

  private turno:Jugada ={
    index:0,
    valor:null
  };

  private siguiente:boolean=false;
  @Input()
  public panel:any[]=[];

  //variable para emitir la jugada el componente padre (app.component)
  @Output()
  public jugada:EventEmitter<Jugada> = new EventEmitter();

  hacerJugada(index:number,element:string){

    this.turno.index = index;

    // alternamos el valor del turno dependiendo si el valor de siguiente es verdadero o falso
    this.turno.valor = this.siguiente ? 'X': 'O';
    //verificamos si la casilla esta vacia, de lo contrario no se emite el valor 
    if(this.verificarCasilla(element)){
      this.jugada.emit(this.turno);
      this.siguiente = !this.siguiente;
    }
  }

  // si la casilla contiene el valor de null entonces la posicion no ha sido seleccionada y retornamos true
  verificarCasilla(casilla:string){
    return casilla == null ? true:false;
  }

}
