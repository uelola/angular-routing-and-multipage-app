import {
  Component,
  // computed,
  // DestroyRef,
  inject,
  input,
  // OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  // ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // export class UserTasksComponent implements OnInit {
  // needs to be used withComponentInputBinding() added in app.config.ts
  // userId = input.required<string>();
  message = input.required<string>();
  // userName = '';
  userName = input.required<string>();

  // when used with resolve in app.routes.ts the below 3 lines are not needed
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name,
  // );

  // when used with resolve in app.routes.ts the ngOnInit is no longer used
  // ngOnInit(): void {
  //   console.log('Input Data: ' + this.message());
  //   console.log(this.activatedRoute);
  //   const subscribtion = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
  // }

  // this approach will allow static and dynamicly resolved data (userName)
  // need also to add private activatedRoute = inject(ActivatedRoute);
  // add implements OnInit and unsubscribe at the end
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //   });
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId'),
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState,
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
