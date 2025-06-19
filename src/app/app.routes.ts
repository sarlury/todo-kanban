import { Routes } from '@angular/router';
import { TodoTable } from './features/todo/components/todo-table/todo-table';

export const routes: Routes = [
    {
        path: '', redirectTo: 'todo', pathMatch: 'full'
    },
    {
        path: 'todo', component: TodoTable
    }
];
