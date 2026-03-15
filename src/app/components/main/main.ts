import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Users } from '../../services/users';
import { IUser } from '../../interfaces/i-user';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../card/card';

@Component({
  selector: 'app-main',
  imports: [Card],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  usersService = inject(Users);
  misUsuarios: IUser[] | undefined = undefined;
  idUsuario: string = '';

   //añadir paginación
  datosPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 0;
  totalPaginas: number = 0;

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {

    this.usersService.getAllUsersPerPage().subscribe((data) => {
      this.misUsuarios = data.results;
      this.itemsPorPagina=data.per_page;
      this.totalPaginas=data.total_pages;
      console.log(this.itemsPorPagina);
      console.log(this.totalPaginas);

      this.route.paramMap.subscribe(params => {
        
        const newUser:any = {
          id: 20,
          first_name: params.get('nombre'),
          last_name: params.get('apellidos'),
          username: null,
          email: params.get('email'),
          image: params.get('imagen')
        };

        if(params.get('nombre')) this.misUsuarios?.push(newUser);
      });
      
      this.cd.detectChanges();
    });
  }

  recogerId($event: string) {
    this.idUsuario = $event;
    this.misUsuarios = this.misUsuarios?.filter(elem => elem._id !== $event);
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
     this.usersService.getAllUsersPerPage(this.paginaActual).subscribe((data) => {
      this.misUsuarios = data.results;
      
      this.cd.detectChanges();
    });
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

}
