import { createSelector } from 'reselect';
import { getUIState } from '../selectors';
import memoize from 'lodash.memoize'

export const getModalGatewayState = createSelector(
  getUIState,
  ui => ui.modals,
);

export const getVisibleModals = createSelector(
  getModalGatewayState,
  modals => Object.values(modals.visibleModals),
);

export const getVisibleModalByName = createSelector(
  getVisibleModals,
  modals => memoize(modalName => modals.find(modal => modal.modalName === modalName) || {}),
);

export const getModalParamsByName = createSelector(
  getVisibleModals,
  modals => memoize(modalName => {
    const modal = modals.find(modal => modal.modalName === modalName)
    return modal ? modal.modalParams : () => {}
  })
)