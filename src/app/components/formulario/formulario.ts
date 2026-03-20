import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../services/users';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  paramId: number = 0;
  miUsuario: any;
  miForm: FormGroup;
  misUsuarios: any = [];
  usersService = inject(Users);
  titulo: string = 'NUEVO USUARIO';
  textoBoton: string = 'Guardar';

  activeRoute = inject(ActivatedRoute);

  constructor(private router: Router) {

    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellidos: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
      ])
    }, []);
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: any) => {
      if (Object.keys(params).length > 0) {
        //FORMULARIO DE ACTUALIZACIÓN

        this.titulo = 'ACTUALIZAR USUARIO';
        this.textoBoton = 'Actualizar';
        this.paramId = params.id;

        this.usersService.getUserById(params.id).subscribe((data) => {
          this.miUsuario = data;

          this.miForm.controls['nombre'].setValue(this.miUsuario.first_name);
          this.miForm.controls['apellidos'].setValue(this.miUsuario.last_name);
          this.miForm.controls['email'].setValue(this.miUsuario.email);
          this.miForm.controls['imagen'].setValue(this.miUsuario.image);
        });

      } else {
        //FORMULARIO DE NUEVO USUARIO
        this.miUsuario = {};
      }

    });
  }

  cargarDatos() {
    let body: any = this.miForm.value;

    //marcar campos como touched al guardar
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    if (Object.keys(this.miUsuario).length > 0) {
      //actualizar datos    
      this.usersService.updateUser(this.paramId, body).subscribe((data) => {
        if (data.error) {
          Swal.fire('Ha habido un error', '', 'info');

        } else {
          //this.miForm.reset();
          Swal.fire('Actualizado!', body.nombre, 'success');
        }

      });

    } else {
      //guardar datos

      this.usersService.insertUser(body).subscribe((data) => {

        if (data.error) {
          Swal.fire('Ha habido un error', '', 'info');
        } else {
          //console.log(this.miForm.value);
          //this.miForm.reset();
          Swal.fire('Guardado!', body.nombre, 'success');
          this.router.navigate(['/home',this.miForm.value]);
        }
      });
    }
  }
}
