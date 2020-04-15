import SchedulesService from '../../../services/schedules';

export function getSchedulesFromMonth(date_start, date_end, user_id) {
  return dispatch => {
    try {
      SchedulesService.getAllForDentist(date_start, date_end, user_id).then(
        response => {
          let object = false;
          response.data.map(item => {
            object = { ...object, ...item };
          });
          dispatch({
            type: '@schedules/GET_FOR_MONTH_SUCCESS',
            payload: object,
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}
