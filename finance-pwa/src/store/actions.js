import axios from "axios";
import config from "../config";

const TOKEN = "";

export const COLLAPSE_MENU = "COLLAPSE_MENU";
export const COLLAPSE_TOGGLE = "COLLAPSE_TOGGLE";
export const FULL_SCREEN = "FULL_SCREEN";
export const FULL_SCREEN_EXIT = "FULL_SCREEN_EXIT";
export const CHANGE_LAYOUT = "CHANGE_LAYOUT";
export const NAV_CONTENT_LEAVE = "NAV_CONTENT_LEAVE";
export const NAV_COLLAPSE_LEAVE = "NAV_COLLAPSE_LEAVE";
export const FETCH_LOAN = "FETCH_LOAN";
export const FETCH_LOAN_SUCCESS = "FETCH_LOAN_SUCCESS";
export const SAVE_LOAN = "SAVE_LOAN";
export const SAVE_LOAN_START = "SAVE_LOAN_START";
export const SAVE_LOAN_SUCCESS = "SAVE_LOAN_SUCCESS";
export const SAVE_LOAN_FAILURE = "SAVE_LOAN_FAILURE";
export const UPDATE_LOAN = "UPDATE_LOAN";

export const getLoan = () => ({
  type: FETCH_LOAN,
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
  type: FETCH_LOAN_SUCCESS,
  payload: {
    fetching: false,
    error,
  },
});

export const saveLoan = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(saveLoanStart());

      const response = await axios({
        url: `${config.api.base}/${config.api.loans.save}`,
        method: "post",
        headers: {
          "Content-type": "application/json",
          Autorization: `bearer ${TOKEN}`,
        },
        data: {
          ...payload,
        },
      });
      saveLoanSuccess(response.data);

    } catch (error) {
        saveLoanFailure(error);
    }
  };
};

export const saveLoanStart = () => ({
  type: SAVE_LOAN_START,
  payload: {
    saving: true,
  },
});

export const saveLoanSuccess = (loan) => ({
  type: SAVE_LOAN_SUCCESS,
  payload: {
    saving: false,
    loan,
  },
});

export const saveLoanFailure = (error) => ({
  type: SAVE_LOAN_FAILURE,
  payload: {
    saving: false,
    error,
  },
});
