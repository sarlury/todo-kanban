import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../core/models/todo.model';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from '../../../core/services/todo-service';
import { Status } from '../../../core/models/enums';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-kanban',
  imports: [
    DragDropModule,
    FormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss'
})
export class Kanban implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  search = '';
  developerFilter = '';
  sortKey: keyof Todo = 'title';

  statuses: Status[] = []

  constructor(
    private todoService: TodoService
  ){

  }
  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodoList().subscribe(res => {
      this.todos = res.data;
      this.applyFilters();
    });
  }

applyFilters() {
    this.filteredTodos = this.todos
      .filter(todo => todo.title.toLowerCase().includes(this.search.toLowerCase()))
      .filter(todo => this.developerFilter === '' || todo.developer.includes(this.developerFilter))
      .sort((a, b) => {
        const aValue = a[this.sortKey];
        const bValue = b[this.sortKey];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }
        // Optionally handle arrays or other types here
        return 0;
      });
  }

  getTodosByStatus(status: string) {
  return this.filteredTodos ? this.filteredTodos.filter(t => t.status === status) : [];
}

  onSearchChange() {
    this.applyFilters();
  }

  drop(event: CdkDragDrop<Todo[]>, status: string) {
    const item = event.previousContainer.data[event.previousIndex];
    item.status = status as Status;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.todoService.updateTodoStatus(item.id, status).subscribe(() => {
      this.getTodos(); // Refresh data
    });
  }

  openTaskModal() {
    // open modal to create new task
  }

}
