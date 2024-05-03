import { Component, OnInit } from '@angular/core';
import { IToDo, ToDoListService } from '../../service/to-do-list.service';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})

export class ToDoListComponent implements OnInit{
  public ToDo: IToDo[] = [];
  public newToDo: string | undefined;

  constructor(protected service: ToDoListService) { }

  ngOnInit(): void {
    this.ToDo = this.service.TaskToDo;
  }

  protected deleteItem(id: number){
    const array = this.service.TaskToDo;

    const index = array.findIndex(item => item.id === id);

    if(index !== -1){
      array.splice(index, 1);

      console.log('Задача номер ' + index + ' успешно удаленна!');
    }

    for(let i=0; i<this.service.TaskToDo.length; i++){
      this.service.TaskToDo[i].id = i+1;
    }
    this.ngOnInit();
  }

  public addItem(){
    if(this.newToDo !== undefined){
      this.service.TaskToDo.push({id: this.service.TaskToDo.length + 1, text: this.newToDo})
    }
  }
}

