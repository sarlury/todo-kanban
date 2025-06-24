import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { TodoTable } from '../../todo/components/todo-table/todo-table';
import { Todo } from '../../../core/models/todo.model';
import { Kanban } from '../../kanban/kanban/kanban';

@Component({
  selector: 'app-menu-tabs',
  imports: [
    TodoTable,
    Kanban
  ],
  templateUrl: './menu-tabs.html',
  styleUrl: './menu-tabs.scss'
})
export class MenuTabs {
  activeTab: 'table' | 'kanban' = 'table';
  sortColumn: string = '';
  sortDirectionAsc = true;
  constructor(){}

  addTab() {}

  search(){}

  triggerSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirectionAsc = !this.sortDirectionAsc;
    } else {
      this.sortColumn = column;
      this.sortDirectionAsc = true;
    }
  }

}
