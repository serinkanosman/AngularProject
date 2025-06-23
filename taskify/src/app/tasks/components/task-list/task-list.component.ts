import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service'; // ✅ Servisi import et
import { Task } from '../../model/task.model'; // ✅ Doğru modeli import et
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  completedCount = 0;
  uncompletedCount = 0;
  progress = 0;
  allTasks: Task[] = [];

  constructor(public taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks(); // ✅ Servisten görevleri al
    this.tasks$.subscribe(tasks => {
      this.allTasks = tasks;
      this.completedCount = tasks.filter(t => t.isCompleted).length;
      this.uncompletedCount = tasks.filter(t => !t.isCompleted).length;
      this.progress = tasks.length > 0 ? Math.round((this.completedCount / tasks.length) * 100) : 0;
    });
  }

  get completedTasks(): Task[] {
    return this.allTasks.filter(t => t.isCompleted);
  }

  get uncompletedTasks(): Task[] {
    return this.allTasks.filter(t => !t.isCompleted);
  }
}
