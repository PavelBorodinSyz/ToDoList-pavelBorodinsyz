import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../../../../service/to-do-list.service';
import { ToastService } from '../../../../service/toast.service';
import { EToDoListItemStatus, IToDoListItem, IToDoListItemCreate } from '../../../../models/to-do-list';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})

export class ToDoListComponent implements OnInit{
  public ToDo: Array<IToDoListItem> = [];
  public isLoading: boolean = true;
  public editedItemId: IToDoListItem["id"] | null = null;
  public toDoListItemEnum = EToDoListItemStatus;

  constructor(protected service: ToDoListService,
              private toastService: ToastService,
              private activatedRoute: ActivatedRoute,
              private toDoListService: ToDoListService) { }

  ngOnInit(): void {
    this.getToDoList();
  }

  protected deleteItem(id: number){
        this.toDoListService.deleteToDoListItemById(id).subscribe({
            next: () => {
                const deletedItemIndex = this.ToDo.findIndex(item => item.id === id);
                if (deletedItemIndex > -1)
                    this.ToDo.splice(deletedItemIndex, 1);
                this.toastService.showToast("Задача удалена");
            },
            error: () => {
                this.toastService.showToast("Ошибка при удалении задачи");
            }
        });
    }

  public get getItemIdFromRoute(): number | null {
    return this.activatedRoute.snapshot.children.length === 0 ?
      null : +this.activatedRoute.snapshot.children[0].params['id'];
  }

  getToDoList(): void {
    this.toDoListService.getToDoListItems().pipe(
        tap(() => this.isLoading = true),
    )
    .subscribe({
        next: (receivedToDoListItems) => {
            this.ToDo = receivedToDoListItems;
        },
        error: () => {
            this.toastService.showToast("Ошибка при загрузке листа задач");
        },
        complete: () => this.isLoading = false,
    });
  }

  addToDoListItem(formData: IToDoListItemCreate): void {
    this.toDoListService.addToDoListItem(formData.text, formData.description).subscribe({
        next: (addedToDoListItem) => {
            this.ToDo.push(addedToDoListItem);
            this.toastService.showToast("Задача добавлена");
        },
        error: () => {
            this.toastService.showToast("Ошибка при добавлении задачи");
        }
    });
  }

  editToDoListItemTitleById(itemId: IToDoListItem["id"], title: IToDoListItem["text"]): void {
    if (this.toDoListService.editItemTitleById(itemId, title)) {
        this.editedItemId = null;
        this.toastService.showToast("Задача изменена");
    }
    this.toDoListService.editItemTitleById(itemId, title).subscribe({
        next: (editedToDoListItem) => {
            const deprecatedItemIndex = this.ToDo.findIndex(item => item.id === editedToDoListItem.id);
            this.ToDo[deprecatedItemIndex] = editedToDoListItem;
            this.editedItemId = null;
            this.toastService.showToast("Задача изменена");
        },
        error: () => {
            this.toastService.showToast("Ошибка при изменении задачи");
        }
    });
}

  editToDoListItemStatusById(itemId: IToDoListItem["id"], itemStatus: IToDoListItem["status"]): void {
    this.toDoListService.editItemStatusById(itemId, itemStatus).subscribe({
        next: (editedToDoListItem) => {
            const deprecatedItemIndex = this.ToDo.findIndex(item => item.id === editedToDoListItem.id);
            this.ToDo[deprecatedItemIndex] = editedToDoListItem;
            this.toastService.showToast("Статус задачи был изменен");
        },
        error: () => {
            this.toastService.showToast("Ошибка при изменении задачи");
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

