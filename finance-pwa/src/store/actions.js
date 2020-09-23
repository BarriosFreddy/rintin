import axios from "../helpers/axios";
import config from "../config";

export const COLLAPSE_MENU = "COLLAPSE_MENU";
export const COLLAPSE_TOGGLE = "COLLAPSE_TOGGLE";
export const FULL_SCREEN = "FULL_SCREEN";
export const FULL_SCREEN_EXIT = "FULL_SCREEN_EXIT";
export const CHANGE_LAYOUT = "CHANGE_LAYOUT";
export const NAV_CONTENT_LEAVE = "NAV_CONTENT_LEAVE";
export const NAV_COLLAPSE_LEAVE = "NAV_COLLAPSE_LEAVE";

export const FETCH_LOAN = "FETCH_LOAN";
export const FETCH_LOAN_START = "FETCH_LOAN_START";
export const FETCH_LOAN_SUCCESS = "FETCH_LOAN_SUCCESS";
export const FETCH_LOAN_FAILURE = "FETCH_LOAN_FAILURE";
export const TYPE = "TYPE";
export const SAVE_LOAN = "SAVE_LOAN";
export const SAVE_LOAN_START = "SAVE_LOAN_START";
export const SAVE_LOAN_SUCCESS = "SAVE_LOAN_SUCCESS";
export const SAVE_LOAN_FAILURE = "SAVE_LOAN_FAILURE";

export const getLoan = () => {
  return async (dispatch) => {
    try {
      dispatch(getLoanStart());
      const response = await axios({
        url: `${config.api.base}${config.api.loans.findAll}`,
        method: "GET",
      });
      console.log({ response });
      dispatch(getLoanSuccess(response.data));
    } catch (error) {
      dispatch(getLoanFailure(error));
    }
  };
};

export const getLoanStart = () => ({
  type: FETCH_LOAN_START,
  payload: {
    fetching: true,
  },
});

export const getLoanSuccess = (loans) => ({
  type: FETCH_LOAN_SUCCESS,
  payload: {
    fetching: false,
    loans,
  },
});

export const getLoanFailure = (error) => ({
  type: FETCH_LOAN_FAILURE,
  payload: {
    fetching: false,
    error,
  },
});

export const saveLoan = (loan) => {
  return async (dispatch) => {
    try {
      dispatch(saveLoanStart());
      const response = await axios({
        url: `${config.api.base}${config.api.loans.save}`,
        method: "post",
        data: {
          ...loan,
        },
      });
      dispatch(saveLoanSuccess(response.data));
      dispatch(getLoan());
    } catch (error) {
      dispatch(saveLoanFailure(error));
    }
  };
};

export const saveLoanStart = () => ({
  type: TYPE,
  payload: {
    saving: true,
  },
});

export const saveLoanSuccess = () => ({
  type: TYPE,
  payload: {
    saving: false,
  },
});

export const saveLoanFailure = (error) => ({
  type: TYPE,
  payload: {
    saving: false,
    loans: [],
    error,
  },
});
