import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Users } from '../../services/users';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  miUsuario:IUser | null=null;
  usersService=inject(Users);

  @Input() imagen:string='';
  @Input() nombre:string='';
  @Input() id:string='0';
  @Input() _id:string|undefined='';

  @Output() fotoEmitir:EventEmitter<string>=new EventEmitter();

  eliminar($event:Event,id:string | undefined){
      $event.preventDefault();

      Swal.fire({
        title: '¿Estás seguro de eliminar el usuario?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#ff0000',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
  
            this.usersService.deleteUser(id).subscribe((data)=>{
            //console.log(data);
  
            if(data.error){
              Swal.fire('Ha habido un error', '', 'info');
            }else{
              this.fotoEmitir.emit(id);
              Swal.fire('Eliminado!', data.first_name, 'success');
            }
          });
        }
      });
    }
}
