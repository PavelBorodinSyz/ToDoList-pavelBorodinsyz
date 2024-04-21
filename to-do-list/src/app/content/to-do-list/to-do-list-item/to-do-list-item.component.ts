import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IToDo } from '../../../service/to-do-list.service';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})

export class ToDoListComponentItem {
    @Input() items!: IToDo[];
    @Output() delete: EventEmitter<number> = new EventEmitter();

    public emitDelete(id: number){
        this.delete.emit(id);
    }
}