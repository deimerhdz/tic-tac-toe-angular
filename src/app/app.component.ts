import { Component, OnInit } from '@angular/core';
import { Jugada } from './interfaces/jugada.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  ngOnInit(): void {
   this.empezarJuego();
  }
  public panel:any[]=[];

  // variable para mostrar el turno del jugador actual
  public jugadorActual:string='';
  
  empezarJuego(){
    this.panel = new Array(9).fill(null);
    this.jugadorActual='';
  }
  // actualizamos la jugada en el panel y 
  //luego verificamos si existe las posibles casillas ganadoras con los mismos valores
  agregarTurno(jugada:Jugada){
     this.jugadorActual = jugada.valor;
     this.panel.splice(jugada.index,1,jugada.valor);
     const ganador:string = this.verificarGanador(this.panel);
     
     if(ganador!=''){
      Swal.fire({
        title: 'El Jugador '+ganador+' ha ganado la partida',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.empezarJuego();
     }
   
  }

  verificarGanador(panel:any[]):string{
   /*
   0 1 2
   3 4 5
   6 7 8
   */
  let ganador='';
  const lineas =[
    [0,1,2],[3,4,5],[6,7,8],
    [0,4,8],[2,4,6],[0,3,6],
    [1,4,7],[2,5,8]
  ];
  //recorremos las lines para obtener el indice
  //luego se obtiene los valores correspondientes en el panel y se verifica si son iguales para retornar el ganador
  for (let index = 0; index < lineas.length; index++) {
    const [a,b,c] = lineas[index];
    if(panel[a] && panel[a] == panel[b] && panel[a] == panel[c]){
      ganador = panel[a];
    }
  }
  return ganador;
  }

}
