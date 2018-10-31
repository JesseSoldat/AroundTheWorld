import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
// rxjs
import { switchMap, tap, first, filter } from "rxjs/operators";
import { Observable } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOverlay, selectStory } from "../story.selector";
import { selectUserId } from "../../auth/auth.selectors";
// services
import { StoryService } from "../../services/story.service";
// actions
import { OpenModal } from "src/app/core/modals/modal.actions";

@Component({
  selector: "app-story-details",
  templateUrl: "./story-details.component.html",
  styleUrls: ["./story-details.component.css"]
})
export class StoryDetailsComponent implements OnInit {
  overlay$: Observable<boolean>;
  story$: Observable<any>;
  storyId: string;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.getUserId();
    this.getStory();
    this.showOverlay();
  }

  // store / api calls
  showOverlay() {
    this.overlay$ = this.store.pipe(select(selectOverlay));
  }

  getStory() {
    this.story$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.storyId = params.get("storyId");
        return this.store.select(selectStory(this.storyId));
      }),
      tap(story => {
        if (story) return;

        this.storyService
          .getMyStories()
          .pipe(tap(() => console.log("Fetching Stories from Server")))
          .subscribe();
      })
    );
  }

  getUserId() {
    this.store
      .pipe(
        select(selectUserId),
        filter(userId => userId !== null),
        first(),
        tap(userId => (this.userId = userId))
      )
      .subscribe();
  }

  // events & cbs
  addImage() {
    this.router.navigateByUrl(`/uploadImage/${this.userId}/${this.storyId}`);
  }

  viewImage(imageUrl) {
    this.store.dispatch(
      new OpenModal({
        modalType: "imageDetails",
        data: { ...imageUrl, storyId: this.storyId }
      })
    );
  }
}
