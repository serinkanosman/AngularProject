import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from "./tasks/components/task-list/task-list.component";
import { TaskFormComponent } from "./tasks/components/task-form/task-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskify';
}
