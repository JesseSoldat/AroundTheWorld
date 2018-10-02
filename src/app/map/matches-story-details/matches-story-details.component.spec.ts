import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesStoryDetailsComponent } from './matches-story-details.component';

describe('MatchesStoryDetailsComponent', () => {
  let component: MatchesStoryDetailsComponent;
  let fixture: ComponentFixture<MatchesStoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesStoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesStoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
