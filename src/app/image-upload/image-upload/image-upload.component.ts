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
  saveUrlRefToTheStory(url: string) {
    this.storyService
      .addImageToStory(url, this.storyId)
      .subscribe(res => {}, err => {});
  }
}
