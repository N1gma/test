import { createAction } from 'redux-actions';
import * as modalActionTypes from './actionTypes';

export const modalShow = createAction(
  modalActionTypes.MODAL_SHOW,
  (modalName, modalParams) => ({
    modalName,
    modalParams,
  }),
);

export const modalHide = createAction(modalActionTypes.MODAL_HIDE, modalName => modalName);
