import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesStoryListComponent } from './matches-story-list.component';

describe('MatchesStoryListComponent', () => {
  let component: MatchesStoryListComponent;
  let fixture: ComponentFixture<MatchesStoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesStoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesStoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
