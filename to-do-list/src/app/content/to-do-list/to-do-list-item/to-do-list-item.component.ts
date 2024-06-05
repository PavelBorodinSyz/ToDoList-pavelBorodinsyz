import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastService } from '../../../service/toast.service';
import { IToDo } from '../../../service/to-do-list.service';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})

export class ToDoListComponentItem {
    @Input() item!: IToDo;
    @Output() delete: EventEmitter<number> = new EventEmitter();
    @Output() setDesc: EventEmitter<number> = new EventEmitter();
    isEditMode: boolean = false;

    constructor(public toastService: ToastService){}

    public emitDelete(id: number){
        this.delete.emit(id);
    }

    emitDesc(id: number): void {
      this.setDesc.emit(id);
    }

    turnEditMode(){
      if(this.isEditMode === false){
        this.isEditMode = true;
      }else{
        this.isEditMode = false;
        this.toastService.showToast("Задача изменена");
      }
    }
}