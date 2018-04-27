import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
//import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';


const routes: Routes = [
  /* { path: 'login', component: PasswordlessAuthComponent },; */
  {
    path: 'gameplay',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
