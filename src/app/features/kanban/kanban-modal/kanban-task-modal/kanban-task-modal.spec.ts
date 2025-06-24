import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTaskModal } from './kanban-task-modal';

describe('KanbanTaskModal', () => {
  let component: KanbanTaskModal;
  let fixture: ComponentFixture<KanbanTaskModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanTaskModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanTaskModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
