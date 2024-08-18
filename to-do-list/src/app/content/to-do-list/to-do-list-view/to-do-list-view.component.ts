import { Component } from '@angular/core';
import { ToDoListService } from '../../../service/to-do-list.service';
import { ToastService } from '../../../service/toast.service';
import { ActivatedRoute } from '@angular/router';
import { IToDoListItem } from '../../models/to-do-list';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-to-do-list-view',
  templateUrl: './to-do-list-view.component.html',
  styleUrl: './to-do-list-view.component.scss'
})
export class ToDoListViewComponent {
  public description!: IToDoListItem["description"];
  public componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
      private toastService: ToastService,
      private toDoListService: ToDoListService) { }

  ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
      this.activatedRoute.params.pipe(takeUntil(this.componentDestroyed$)).subscribe((params) => {
          this.toDoListService.getToDoListItemById(params["id"]).subscribe({
              next: (toDoListItem) => {
                  this.description = toDoListItem.description;
              },
              error: (err: HttpErrorResponse) => {
                  this.toastService.showToast(err.message);
              },
          });
      });
  }

}
