import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMapStoryFormComponent } from './add-map-story-form.component';

describe('AddMapStoryFormComponent', () => {
  let component: AddMapStoryFormComponent;
  let fixture: ComponentFixture<AddMapStoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMapStoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMapStoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
