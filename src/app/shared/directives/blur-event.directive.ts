import { Directive, Output, HostListener, EventEmitter } from "@angular/core";

@Directive({
  selector: "[appBlurEvent]"
})
export class BlurEventDirective {
  @Output()
  appBlurEvent = new EventEmitter();

  //  @HostListener - subscribe to events of the element
  @HostListener("focusout", ["$event.target"])
  onFocusout(target) {
    this.appBlurEvent.emit(target.name);
  }
}
