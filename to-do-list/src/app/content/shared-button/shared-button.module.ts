import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DeleteButtonComponent,
    SaveButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [DeleteButtonComponent, SaveButtonComponent]
})
export class SharedButtonModule { }
