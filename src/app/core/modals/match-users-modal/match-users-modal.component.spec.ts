import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchUsersModalComponent } from './match-users-modal.component';

describe('MatchUsersModalComponent', () => {
  let component: MatchUsersModalComponent;
  let fixture: ComponentFixture<MatchUsersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchUsersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
