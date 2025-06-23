import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

import { TaskListComponent } from './app/tasks/components/task-list/task-list.component';
import { TaskDetailComponent } from './app/tasks/components/task-detail/task-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
