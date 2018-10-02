import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
// Firebase
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
// Rxjs
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { ShowMsg } from "../../shared/shared.actions";

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
  snapshot: Observable<any>;
  // Download URL
  downloadURL$: Observable<any>;
  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get("userId");
      this.storyId = params.get("storyId");
    });
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      const msg = { info: "The file type is not supported", color: "red" };
      return this.store.dispatch(new ShowMsg({ msg }));
    }

    const path = `aroundTheWorld/${new Date().getTime()}_${file.name}`;

    this.task = this.storage.upload(path, file);

    this.task
      .snapshotChanges()
      .pipe(
        tap(snap => {
          console.log(snap);
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
    this.snapshot = this.task.snapshotChanges();

    // The file's download URL
    const ref = this.storage.ref(path);
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  saveUrlRefToTheStory(url: string) {
    console.log("url:", url);
  }
}