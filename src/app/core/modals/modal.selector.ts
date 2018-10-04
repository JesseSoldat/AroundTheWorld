import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModalState } from "./modal.reducer";

export const selectModalState = createFeatureSelector<ModalState>("modal");

export const selectModalType = createSelector(selectModalState, modalState => {
  if (modalState === null) return null;
  return modalState.modalType;
});

export const selectModalData = createSelector(selectModalState, modalState => {
  if (modalState === null) return null;
  return modalState.data;
});
