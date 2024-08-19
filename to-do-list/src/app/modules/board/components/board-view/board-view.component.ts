import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../../../../service/to-do-list.service';
import { EToDoListItemStatus, IToDoListItem } from '../../../../models/to-do-list';


@Component({
    selector: 'app-board-view',
    templateUrl: './board-view.component.html',
    styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit {
    readonly toDoListItemStatus = EToDoListItemStatus;
    allToDoListItems: IToDoListItem[] = [];
    inProgressToDoListItems: IToDoListItem[] = [];
    completedToDoListItems: IToDoListItem[] = [];

    constructor(private toDoListService: ToDoListService) { }

    ngOnInit(): void {
        this.toDoListService.getToDoListItems().subscribe(
            (toDoListItems) => {
                this.allToDoListItems = toDoListItems;
                this.inProgressToDoListItems = toDoListItems.filter(item => item.status === EToDoListItemStatus.InProgress);
                this.completedToDoListItems = toDoListItems.filter(item => item.status === EToDoListItemStatus.Completed);
            });
    }
}