import { NgModule } from '@angular/core';

// Form and Input Modules
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

// UI & Feedback
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

// Drag & Drop
import { DragDropModule } from 'primeng/dragdrop';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  exports: [
    // Form
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,

    // UI
    ButtonModule,
    DialogModule,
    ToastModule,
    TableModule,
    TagModule,
    // module primeNg Avatar
    AvatarModule,

    // DnD
    DragDropModule
  ]
})
export class PrimeNgModule {}
