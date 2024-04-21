import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './content/to-do-list/to-do-list.component';
import { ToDoListComponentItem } from './content/to-do-list/to-do-list-item/to-do-list-item.component';
import { ToDoListService } from './service/to-do-list.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListComponentItem
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    ToDoListService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
