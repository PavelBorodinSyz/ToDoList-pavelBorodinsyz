import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { MatButtonModule } from '@angular/material/button';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from '../directive/tooltip.directive';
import { MatCardModule } from '@angular/material/card';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { AngularMaterialModule } from '../angular-material.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DeleteButtonComponent,
    SaveButtonComponent,
    TooltipComponent,
    TooltipDirective,
    IconButtonComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [DeleteButtonComponent, SaveButtonComponent, TooltipDirective, IconButtonComponent, LoadingSpinnerComponent]
})
export class SharedModule { }
