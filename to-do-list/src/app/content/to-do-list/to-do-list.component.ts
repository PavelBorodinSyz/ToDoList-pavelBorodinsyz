import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../../service/to-do-list.service';
import { ToastService } from '../../service/toast.service';
import { EToDoListItemStatus, IToDoListItem, IToDoListItemCreate } from '../models/to-do-list';
import { MatButtonToggleChange } from '@angular/material/button-toggle';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})

export class ToDoListComponent implements OnInit{
  public ToDo: Array<IToDoListItem> = [];
  public isLoading: boolean = true;
  public selectedItemId: IToDoListItem["id"] | null = null;
  public editedItemId: IToDoListItem["id"] | null = null;
  public toDoListItemEnum = EToDoListItemStatus;

  constructor(protected service: ToDoListService,
              public toastService: ToastService,
              public toDoListService: ToDoListService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    this.getToDoList();
  }

  protected deleteItem(id: number){
        this.toDoListService.deleteToDoListItemById(id).subscribe({
            next: () => {
                const deletedItemIndex = this.ToDo.findIndex(item => item.id === id);
                if (deletedItemIndex > -1)
                    this.ToDo.splice(deletedItemIndex, 1);
                if (id === this.selectedItemId)
                    this.selectedItemId = null;
                this.toastService.showToast("Todo deleted");
            },
            error: () => {
                this.toastService.showToast("Failed to delete todo");
            }
        });
    }

  /* public addItem(){
    if(this.newToDoName !== undefined){
      this.service.TaskToDo.push({
        id: this.service.TaskToDo.length + 1, 
        text: this.newToDoName,
        description: this.newToDoDesc!});
        this.toastService.showToast('Новая задача добавлена');
    }
  } */

  public setSelectedIdToDo(id: number){
    this.selectedItemId = id;
  }

  getSelectedToDoDescription(): IToDoListItem["description"] {
    const array = this.ToDo;
    const toDoListItem: IToDoListItem | undefined = array.find(item => item.id === this.selectedItemId);
    return toDoListItem ? toDoListItem.description : "";
  }

  getToDoList(): void {
    this.toDoListService.getToDoListItems().subscribe({
        next: (receivedToDoListItems) => {
            this.ToDo = receivedToDoListItems;
        },
        error: () => {
            this.toastService.showToast("Failed to load todo list");
        }
    });
  }

  addToDoListItem(formData: IToDoListItemCreate): void {
    this.toDoListService.addToDoListItem(formData.text, formData.description).subscribe({
        next: (addedToDoListItem) => {
            this.ToDo.push(addedToDoListItem);
            this.toastService.showToast("Item added");
        },
        error: () => {
            this.toastService.showToast("Failed to add todo");
        }
    });
  }

  editToDoListItemTitleById(itemId: IToDoListItem["id"], title: IToDoListItem["text"]): void {
    if (this.toDoListService.editItemTitleById(itemId, title)) {
        this.editedItemId = null;
        this.toastService.showToast("Item edited");
    }
    this.toDoListService.editItemTitleById(itemId, title).subscribe({
        next: (editedToDoListItem) => {
            const deprecatedItemIndex = this.ToDo.findIndex(item => item.id === editedToDoListItem.id);
            this.ToDo[deprecatedItemIndex] = editedToDoListItem;
            this.editedItemId = null;
            this.toastService.showToast("Item edited");
        },
        error: () => {
            this.toastService.showToast("Failed to edit todo");
        }
    });
}

  editToDoListItemStatusById(itemId: IToDoListItem["id"], itemStatus: IToDoListItem["status"]): void {
    this.toDoListService.editItemStatusById(itemId, itemStatus).subscribe({
        next: (editedToDoListItem) => {
            const deprecatedItemIndex = this.ToDo.findIndex(item => item.id === editedToDoListItem.id);
            this.ToDo[deprecatedItemIndex] = editedToDoListItem;
            this.toastService.showToast("Task status has been changed");
        },
        error: () => {
            this.toastService.showToast("Failed to edit todo");
        }
    });
  }

  onStatusFilterChange(matButtonToggleChange: MatButtonToggleChange): void {
    if (matButtonToggleChange.value === null)
        this.getToDoList();
    else
        this.toDoListService.getToDoListItemsByStatus(matButtonToggleChange.value).subscribe({
            next: (receivedToDoListItems) => {
                this.ToDo = receivedToDoListItems;
            },
            error: () => {
                this.toastService.showToast("Failed to load todo list");
            }
        });
  }
}

