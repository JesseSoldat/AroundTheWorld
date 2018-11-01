import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { ToastrService } from "ngx-toastr";
// firebase
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
// rxjs
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectStoryOverlay } from "../../map/story.selector";
// services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.css"]
})
export class ImageUploadComponent implements OnInit {
  overlay$: Observable<boolean>;
  userId: string;
  storyId: string;
  // main task
  task: AngularFireUploadTask;
  // progress monitoring
  percentage: Observable<number>;
  snapshot;
  // download url
  downloadURL$: Observable<any>;
  // state for dropzone css toggling
  isHovering: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    private store: Store<AppState>,
    private storyService: StoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.showOverlay();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get("userId");
      this.storyId = params.get("storyId");
    });
  }

  // helpers
  handleError(err) {
    this.toastr.error("", err.msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });
  }

  // store / api calls
  showOverlay() {
    this.overlay$ = this.store.pipe(select(selectStoryOverlay));
  }

  // events & cbs
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    // client-side validation
    if (!file || file.type.split("/")[0] !== "image") {
      const err = { msg: "The file type is not supported" };
      return this.handleError(err);
    }

    const imageName = `story_${new Date().getTime()}`;

    const path = `aroundTheWorld/${this.userId}/story_images/${imageName}`;

    this.task = this.storage.upload(path, file);

    this.task
      .snapshotChanges()
      .pipe(
        tap(snapshot => {
          this.snapshot = snapshot;
        }),
        finalize(() => {
          this.downloadURL$ = ref.getDownloadURL().pipe(
            tap(downloadURL => {
              const storyImg = {
                path,
                downloadURL
              };
              this.saveUrlRefToTheStory(storyImg);
            })
          );
        })
      )
      .subscribe();

    // progress monitoring
    this.percentage = this.task.percentageChanges();

    // the file's download URL
    const ref = this.storage.ref(path);
  }

  goToStory() {
    this.router.navigateByUrl(
      `/map/storyDetails/${this.userId}/${this.storyId}`
    );
  }

  // save to db
  saveUrlRefToTheStory(storyImg) {
    this.storyService
      .addImageToStory(storyImg, this.storyId)
      .subscribe(res => {}, err => {});
  }
}
