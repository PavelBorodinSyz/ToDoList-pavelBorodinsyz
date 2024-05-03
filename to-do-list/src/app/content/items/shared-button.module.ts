import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { MatButtonModule } from '@angular/material/button';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from '../directive/tooltip.directive';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DeleteButtonComponent,
    SaveButtonComponent,
    TooltipComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [DeleteButtonComponent, SaveButtonComponent, TooltipDirective]
})
export class SharedButtonModule { }
