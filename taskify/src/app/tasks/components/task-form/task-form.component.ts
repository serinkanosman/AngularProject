import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: Date.now(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isCompleted: false
      };

      this.taskService.addTask(newTask);
      this.taskForm.reset();
    }
  }
}
