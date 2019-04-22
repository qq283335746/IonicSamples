import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [LoginComponent,NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    LoginComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
