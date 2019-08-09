import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerProfileComponent } from './pages/CustomerProfile/customer-profile.component';
import { CustomerDetailsComponent } from './pages/CustomerProfile/customer-details.component';
const routes: Routes = [
  {
    path: 'customer-profile',
    component: CustomerProfileComponent
  },
  {
    path: 'customer-profile-details/:id',
    component: CustomerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
