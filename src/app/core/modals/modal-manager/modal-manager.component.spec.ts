import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManagerComponent } from './modal-manager.component';

describe('ModalManagerComponent', () => {
  let component: ModalManagerComponent;
  let fixture: ComponentFixture<ModalManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
