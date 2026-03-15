import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { C404 } from './components/c404/c404';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Main},
    {path:'**',component:C404}
];
