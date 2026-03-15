import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Users } from '../../services/users';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  activedRoute = inject(ActivatedRoute);
  usersService = inject(Users);
  id: string = '';
  miUsuario: IUser | null = null;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: any) => {
      this.id = params.id;

    });

    this.usersService.getUserById(this.id).subscribe((data) => {
      //console.log('data:', data);
      this.miUsuario = data;
      this.cd.detectChanges();
    });

  }

  eliminar($event: any, id: string | undefined) {
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

        this.usersService.deleteUser(id).subscribe((data) => {

          if (data.error) {
            Swal.fire('Ha habido un error', '', 'info');
          } else {
            Swal.fire('Eliminado!', data.first_name, 'success');
            this.miUsuario = null;
            this.cd.detectChanges();
          }
        });
      }
    });
  }

}