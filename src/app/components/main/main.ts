import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Users } from '../../services/users';
import { IUser } from '../../interfaces/i-user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  usersService = inject(Users);
  misUsuarios: IUser[] | undefined = undefined;
  idUsuario: string = '';

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {



    this.usersService.getAllUsers().subscribe((data) => {
      this.misUsuarios = data.results;
      console.log(this.misUsuarios);
      this.cd.detectChanges();
    });
  }

}
