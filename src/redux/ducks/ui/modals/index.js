import { handleActions } from 'redux-actions';
import { modalShow, modalHide } from './actions';

const initialState = {
  visibleModals: {},
};

export default handleActions(
  {
    [modalShow]: (state, { payload }) => ({
      ...state,
      visibleModals: {
        ...state.visibleModals,
        [payload.modalName]: {
          modalParams: payload.modalParams,
          modalName: payload.modalName,
        },
      },
    }),

    [modalHide]: (state, { payload }) => ({
      ...state,
      visibleModals: Object.keys(state.visibleModals).reduce((res, key) => {
        if (key !== payload) {
          res[key] = state.visibleModals[key];
        }
        return res;
      }, {}),
    }),
  },
  initialState,
);
