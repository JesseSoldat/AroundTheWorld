import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-img-card",
  templateUrl: "./img-card.component.html",
  styleUrls: ["./img-card.component.css"]
})
export class ImgCardComponent implements OnInit {
  @Output()
  onBtnClick = new EventEmitter();
  @Input()
  data;
  fText: number = 30;

  constructor() {}

  ngOnInit() {}

  handleBtnClick() {
    const ids = {
      userId: this.data.user._id,
      storyId: this.data._id
    };
    this.onBtnClick.emit(ids);
  }
}
