import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { C404 } from './components/c404/c404';
import { Detalle } from './components/detalle/detalle';
import { Formulario } from './components/formulario/formulario';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Main},
    {path:'user/:id',component:Detalle},
    {path:'formulario',component:Formulario},
    {path:'updateuser/:id',component:Formulario},
    {path:'newuser',component:Formulario},
    {path:'**',component:C404}
];
