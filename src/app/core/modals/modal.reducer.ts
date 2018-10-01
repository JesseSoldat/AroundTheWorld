import { ModalActionTypes } from "./modal.actions";

export interface ModalState {
  modalType: string;
  data: any;
}

export const initialModalState: ModalState = {
  modalType: null,
  data: null
};

export function modalReducer(state = initialModalState, action) {
  const { type, payload } = action;

  switch (type) {
    case ModalActionTypes.CloseModal:
      return { ...state, modalType: null, data: null };

    case ModalActionTypes.OpenModal:
      return {
        ...state,
        modalType: payload.modalType,
        data: payload.data
      };

    default:
      return { ...state };
  }
}
