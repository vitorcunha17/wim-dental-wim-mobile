import produce from 'immer';

const INITIAL_STATE = {
  schedules: {},
};

export default function schedules(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@schedules/GET_FOR_MONTH_SUCCESS': {
        draft.schedules = action.payload;
        break;
      }
      default:
    }
  });
}
