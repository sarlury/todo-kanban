import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../../../../core/models/todo.model';
import { Priority, Status, Type } from '../../../../core/models/enums';
import { TodoService } from '../../../../core/services/todo-service';

@Component({
  selector: 'app-todo-table',
  imports: [],
  templateUrl: './todo-table.html',
  styleUrl: './todo-table.scss'
})
export class TodoTable implements OnInit {
  todos$ = new BehaviorSubject<Todo[]>([]);
  filteredTodos$ = new BehaviorSubject<Todo[]>([]);
  search = '';
  selectedDevelopers: string[] = [];
  developers: string[] = [];

  statusEnum = Status;
  priorityEnum = Priority;
  typeEnum = Type;

  editingRowId: string | null = null;


  constructor(
    private todoService: TodoService
  ){}


  ngOnInit(): void {
    this.getTodoData();
  }

  getTodoData(){
    this.todoService.getTodoList().subscribe({
      next: (result) => {
        console.log('result', result)
        // this.todos$ = result;
      }
    })
  }

}
