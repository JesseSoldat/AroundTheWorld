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
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
// services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.css"]
})
export class ImageUploadComponent implements OnInit {
  userId: string;
  storyId: string;
  // Main task
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot;
  // Download URL
  downloadURL$: Observable<any>;
  // State for dropzone CSS toggling
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

  // Events & Cbs
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      const err = { msg: "The file type is not supported" };
      return this.handleError(err);
    }

    const path = `aroundTheWorld/${new Date().getTime()}_${file.name}`;

    this.task = this.storage.upload(path, file);

    this.task
      .snapshotChanges()
      .pipe(
        tap(snapshot => {
          this.snapshot = snapshot;
        }),
        finalize(() => {
          this.downloadURL$ = ref.getDownloadURL().pipe(
            tap(url => {
              this.saveUrlRefToTheStory(url);
            })
          );
        })
      )
      .subscribe();

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    // The file's download URL
    const ref = this.storage.ref(path);
  }

  goToStory() {
    this.router.navigateByUrl(
      `/map/storyDetails/${this.userId}/${this.storyId}`
    );
  }

  // Save to DB
  saveUrlRefToTheStory(url: string) {
    this.storyService
      .addImageToStory(url, this.storyId)
      .subscribe(res => {}, err => {});
  }
}
