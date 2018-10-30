import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// firebase
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
// rxjs
import { Observable } from "rxjs";
import { finalize, tap, filter, first } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { selectUserId } from "../../../auth/auth.selectors";

@Component({
  selector: "app-upload-avatar",
  templateUrl: "./upload-avatar.component.html",
  styleUrls: ["./upload-avatar.component.css"]
})
export class UploadAvatarComponent implements OnInit {
  userId: string;
  // -- firebase --
  task: AngularFireUploadTask;
  // progress monitoring
  percentage: Observable<number>;
  snapshot;
  // download url
  downloadURL$: Observable<any>;
  // -- cropper --
  imageChangedEvent: any = "";
  croppedImage: any = "";
  file: any;

  constructor(
    private toastr: ToastrService,
    private store: Store<AppState>,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.getUserId();
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

  // helpers
  handleError(err) {
    this.toastr.error("", err.msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });
  }

  // events & cbs
  // cropper
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event) {
    this.file = event.file;
    this.croppedImage = event.base64;
  }

  cancelUpload() {
    this.imageChangedEvent = "";
    this.croppedImage = "";
  }

  uploadImage() {
    console.log(this.file);

    // client-side validation
    if (!this.file || this.file.type.split("/")[0] !== "image") {
      const err = { msg: "The file type is not supported" };
      return this.handleError(err);
    }

    const path = `aroundTheWorld/avatar/${this.userId}`;

    console.log(path);

    // this.task = this.storage.upload(path, this.file);

    // const ref = this.storage.ref(path);

    // this.task
    //   .snapshotChanges()
    //   .pipe(
    //     tap(snapshot => {
    //       this.snapshot = snapshot;
    //     }),
    //     finalize(() => {
    //       this.downloadURL$ = ref.getDownloadURL().pipe(
    //         tap(url => {
    //           console.log(url);
    //         })
    //       );
    //     })
    //   )
    //   .subscribe();
  }
}
