import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMapStoryComponent } from './add-map-story.component';

describe('AddMapStoryComponent', () => {
  let component: AddMapStoryComponent;
  let fixture: ComponentFixture<AddMapStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMapStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMapStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
