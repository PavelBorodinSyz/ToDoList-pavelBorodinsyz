import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './content/to-do-list/to-do-list.component';
import { ToDoListComponentItem } from './content/to-do-list/to-do-list-item/to-do-list-item.component';
import { ToDoListService } from './service/to-do-list.service';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedButtonModule } from './content/items/shared-button.module';
import { ToastService } from './service/toast.service';
import { ToastComponent } from './service/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListComponentItem,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    SharedButtonModule
  ],
  providers: [
    ToDoListService,
    ToastService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
