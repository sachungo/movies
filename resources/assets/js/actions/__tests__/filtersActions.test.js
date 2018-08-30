import configureStore from 'redux-mock-store';
import actionTypes from '../../moviesConstants';
import { setSelectedOption, reset } from '../filters';

const mockStore = configureStore();

describe('Filters action test', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches FILTER_CRITERIA_OPTION_CHANGED', () => {
    const payload = {
      id: 12546,
      isChecked: true
    };
    store.dispatch(setSelectedOption(payload));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.FILTER_CRITERIA_OPTION_CHANGED,
      payload,
      criterion: 'actors'
    });
  });

  it('dispatches RESET_FILTER', () => {
    store.dispatch(reset());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.RESET_FILTER,
      criterion: 'actors'
    });
  })
});
