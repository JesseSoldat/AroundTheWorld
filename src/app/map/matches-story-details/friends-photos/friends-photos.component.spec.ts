import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPhotosComponent } from './friends-photos.component';

describe('FriendsPhotosComponent', () => {
  let component: FriendsPhotosComponent;
  let fixture: ComponentFixture<FriendsPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
