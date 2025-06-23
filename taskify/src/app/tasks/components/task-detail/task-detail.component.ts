import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  task$: Observable<Task | undefined>;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (isNaN(id)) {
          return of(undefined);
        }
        return this.taskService.getTasks().pipe(
          switchMap(tasks => of(tasks.find(t => t.id === id)))
        );
      })
    );
  }
}
