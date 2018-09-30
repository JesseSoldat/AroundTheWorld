import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectStoryList } from "../story.selector";
// Services
import { StoryService } from "../../services/story.service";
// Models
import { Story } from "../../models/story.model";

@Component({
  selector: "app-story-list",
  templateUrl: "./story-list.component.html",
  styleUrls: ["./story-list.component.css"]
})
export class StoryListComponent implements OnInit {
  stories$: Observable<Story[]>;

  constructor(
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.stories$ = this.store.pipe(
      select(selectStoryList),
      filter(storyList => storyList !== null),
      tap((storyList: Story[]) => {
        console.log("storyList", storyList);
      })
    );
    this.storyService.getMyStories().subscribe(res => {}, err => {});
    //coordinates: [-104.9903, 39.7392];
    // this.storyService
    //   .matchOtherUsers(this.coordinates)
    //   .subscribe(res => {}, err => {});
  }
}
