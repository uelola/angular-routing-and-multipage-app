import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    // pathMatch: 'prefix',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // domain/users/<uid>/tasks
    component: TasksComponent,
    // need to change 'paramsOrQueryParamsChange' to 'always'
    // because resolveUserTasks will not run (no change in path/queries params)
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new', // domain/users/<uid>/tasks/new
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
