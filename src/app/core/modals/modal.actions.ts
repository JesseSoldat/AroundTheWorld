import { Action } from "@ngrx/store";

export enum ModalActionTypes {
  OpenModal = "OpenModal",
  CloseModal = "CloseModal"
}

export class OpenModal implements Action {
  readonly type = ModalActionTypes.OpenModal;

  constructor(public payload: { modalType: string; data: any }) {}
}

export class CloseModal implements Action {
  readonly type = ModalActionTypes.CloseModal;
}

export type StoryActions = OpenModal | CloseModal;
