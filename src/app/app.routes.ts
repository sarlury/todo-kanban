import { Routes } from '@angular/router';
import { TodoTable } from './features/todo/components/todo-table/todo-table';
import { MenuTabs } from './features/pages/menu-tabs/menu-tabs';

export const routes: Routes = [
    {
        path: '', redirectTo: 'menu', pathMatch: 'full'
    },
    {
        path: 'menu', component: MenuTabs
    }
];
