import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ResolveFn, RouterLink } from '@angular/router';

import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input<'asc' | 'desc' | undefined>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState,
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId'),
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

// export class TasksComponent implements OnInit {
//   userId = input.required<string>();

//   // order = input<'asc' | 'desc'>(); // 1st version
//   // order?: 'asc' | 'desc;'; // 2nd version needs to remove () from order() in html
//   order = signal<'asc' | 'desc'>('desc');
//   private taskService = inject(TasksService);
//   // userTasks = computed(() =>
//   //   this.taskService.allTasks().filter((task) => task.userId === this.userId()),
//   // );
//   userTasks = computed(() =>
//     this.taskService
//       .allTasks()
//       .filter((task) => task.userId === this.userId())
//       .sort((a, b) => {
//         if (this.order() === 'desc') {
//           return a.id > b.id ? -1 : 1;
//         } else {
//           return a.id > b.id ? 1 : -1;
//         }
//       }),
//   );
//   private activatedRoute = inject(ActivatedRoute);
//   private destroyRef = inject(DestroyRef);

//   ngOnInit(): void {
//     // 2nd version
//     // const subscribtion = this.activatedRoute.queryParams.subscribe({
//     //   next: (params) => (this.order = params['order']),
//     // });
//     // this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
//     // 3rd version
//     const subscribtion = this.activatedRoute.queryParams.subscribe({
//       next: (params) => this.order.set(params['order']),
//     });
//     this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
//   }
// }
