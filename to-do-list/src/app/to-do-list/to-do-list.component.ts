import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})

export class ToDoListComponent {
  public list: Array<string> = ['Buy a new gaming laptop', 'Complete previous task', 'Create some angular app']
}
