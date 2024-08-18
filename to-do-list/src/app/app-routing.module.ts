import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './content/to-do-list/to-do-list.component';
import { ToDoListViewComponent } from './content/to-do-list/to-do-list-view/to-do-list-view.component';

const AppRoutes: Routes = [
  {
      path: '',
      redirectTo: 'tasks',
      pathMatch: 'full',
  },
  {
      path: 'tasks',
      component: ToDoListComponent,
      children: [
          {
              path: ':id',
              component: ToDoListViewComponent,
          },
      ],
  },
  {
      path: '**',
      redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
