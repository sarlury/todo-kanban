import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Todo } from '../../../../core/models/todo.model';
import { Priority, Status, Type } from '../../../../core/models/enums';
import { TodoService } from '../../../../core/services/todo-service';
import { MessageService } from 'primeng/api';
import { AsyncPipe, CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { PrimeNgModule } from '../../../../shared/primeng.module';

@Component({
  selector: 'app-todo-table',
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    PrimeNgModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './todo-table.html',
  styleUrl: './todo-table.scss'
})
export class TodoTable implements OnInit, OnDestroy {
  todos: Todo[] = [];
  @Input() sortColumn: string = '';
  @Input() sortAsc: boolean = true;
  todosSubject$ = new BehaviorSubject<Todo[]>([]);
  totalEstimated = 0;
  totalActual = 0;
  searchTerm = '';


  constructor(
    private todoService: TodoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTodoData();
  }

    ngOnChanges(changes: SimpleChanges) {
    if (changes['sortColumn'] || changes['sortAsc']) {
      this.sortTodos();
    }
  }

    sortTodos() {
    if (this.sortColumn) {
      this.todos.sort((a, b) => {
        const valA = (a as any)[this.sortColumn] ?? '';
        const valB = (b as any)[this.sortColumn] ?? '';
        return this.sortAsc
          ? valA.toString().localeCompare(valB.toString())
          : valB.toString().localeCompare(valA.toString());
      });
    }
  }

  getTodoData() {
    this.todoService.getTodoList().subscribe({
      next: (data) => {
        const normalized = data.data.map((item: any) => ({
          ...item,
          estimatedSP: item['Estimated SP'],
          actualSP: item['Actual SP'],
          // Optional: remove old keys
          // or just ignore them in template
        }));
        this.todosSubject$.next(normalized);
        // this.getTotalEstimatedSP()
      }
    })
  }

  getTotalEstimatedSP(): number {
    return this.todos.reduce((sum, todo) => {
      const value = Number(todo.estimatedSP) || 0;
      return sum + value;
    }, 0);
  }
  getTotalActualSP(): number {
    return this.todos.reduce((sum, todo) => {
      const value = Number(todo.actualSP) || 0;
      return sum + value;
    }, 0);
  }
    get filteredTodos() {
    let filtered = [...this.todos];

    if (this.searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const col = this.sortColumn as keyof Todo;
        const valA = a[col] ?? '';
        const valB = b[col] ?? '';
        return this.sortAsc
          ? valA?.toString().localeCompare(valB?.toString())
          : valB?.toString().localeCompare(valA?.toString());
      });
    }

    return filtered;
  }

  sort(col: keyof Todo) {
    console.log('sort', col);
    if (this.sortColumn === col) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = col;
      this.sortAsc = true;
    }
  }

  changeStatusColor(status: Status): string {
    switch (status) {
      case Status.InProgress:
        return 'bg-orange';
      case Status.Ready:
        return 'bg-lightblue';
      case Status.Deploy:
        return 'bg-blue';
      case Status.Done:
        return 'bg-gray';
      case Status.Review:
        return 'bg-darkgray';
      case Status.Stuck:
        return 'bg-purple';
      default:
        return '';
    }
  }

  changePriorityColor(priority: string): string {
    switch (priority) {
      case Priority.Low:
        return 'bg-orange';
      case Priority.Medium:
        return 'bg-purple';
      case Priority.High:
        return 'bg-blue';
      case Priority.Critical:
        return 'bg-darkred';
      default:
        return '';
    }
  }

  changeTypeColor(type: string): string {
    switch (type) {
      case Type.Feature:
        return 'bg-orange';
      case Type.Bug:
        return 'bg-purple';
      default:
        return '';
    }
  }

  openModal() {
    // this.modal.open(TaskModalComponent, { size: 'lg' }).result.then(newTask => {
    //   if (newTask) {
    //     this.todos.unshift(newTask);
    //   }
    // });
  }



  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }




}
