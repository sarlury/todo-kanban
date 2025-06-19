import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { Path } from '../../shared/Path';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(Path.GET_TODO_DATA);
  }
}
