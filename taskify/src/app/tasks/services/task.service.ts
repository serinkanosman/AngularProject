import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

const TASKS_KEY = 'taskify_tasks';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasksFromStorage();
  }

  private loadTasksFromStorage(): void {
    if (isBrowser()) {
      const saved = localStorage.getItem(TASKS_KEY);
      this.tasks = saved ? JSON.parse(saved) : [];
    } else {
      this.tasks = [];
    }
    this.tasksSubject.next(this.tasks);
  }

  private saveTasksToStorage(): void {
    if (isBrowser()) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
    }
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }

  toggleTaskCompletion(id: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }
}
