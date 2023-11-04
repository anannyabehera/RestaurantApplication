import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TableReservationComponent } from './table-reservation/table-reservation.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Home',
    pathMatch:'full'
  },
  {
    path:'Home',
    component:HomeComponent
  },
  {
    path:'reg',
    component:RegisterComponent
  },{
    path:'log',
    component:LoginComponent
  },
  {
    path:'abt',
    component:AboutComponent
  },{
    path:'tbl',
    component:TableReservationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
