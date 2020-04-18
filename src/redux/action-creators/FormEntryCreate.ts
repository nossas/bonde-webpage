/* eslint-disable prefer-promise-reject-errors */
import { FormAnalytics } from 'plugins/Form';
import MobSelectors from '../Selectors';
import * as t from '../ActionTypes';
import { createAction } from './CreateAction';

const asyncFormEntryCreate = ({ mobilization, formEntry }: any) => (
  dispatch: any,
  getState: any,
  { api }: any
) => {
  const state = getState();

  const endpoint = `/mobilizations/${mobilization.id}/form_entries`;
  const body = { form_entry: formEntry };

  dispatch({ type: t.WIDGET_FORM_ENTRY_CREATE_REQUEST });
  return api
    .post(endpoint, body)
    .then(({ data }: any) => {
      dispatch(
        createAction(
          t.WIDGET_FORM_ENTRY_CREATE_SUCCESS,
          updateWidget(state, data)
        )
      );
      FormAnalytics.formSavedData();
      return Promise.resolve();
    })
    .catch((failure: any) => {
      dispatch(createAction(t.WIDGET_FORM_ENTRY_CREATE_FAILURE, failure));
      return Promise.reject({ _error: `Response ${failure}` });
    });
};

const updateWidget = (state: any, payload: any) => {
  const widget = MobSelectors(state, null).getWidget(payload.widget_id);
  return { ...widget, form_entries_count: widget.form_entries_count + 1 };
};

export default asyncFormEntryCreate;
