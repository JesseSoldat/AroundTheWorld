import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMapListComponent } from './my-map-list.component';

describe('MyMapListComponent', () => {
  let component: MyMapListComponent;
  let fixture: ComponentFixture<MyMapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
