import axios from "../helpers/axios";
import config from "../config";

export const COLLAPSE_MENU = "COLLAPSE_MENU";
export const COLLAPSE_TOGGLE = "COLLAPSE_TOGGLE";
export const FULL_SCREEN = "FULL_SCREEN";
export const FULL_SCREEN_EXIT = "FULL_SCREEN_EXIT";
export const CHANGE_LAYOUT = "CHANGE_LAYOUT";
export const NAV_CONTENT_LEAVE = "NAV_CONTENT_LEAVE";
export const NAV_COLLAPSE_LEAVE = "NAV_COLLAPSE_LEAVE";

export const LOAN_TYPE = "LOAN_TYPE";

export const FETCH_LOAN_START = "FETCH_LOAN_START";
export const FETCH_LOAN_SUCCESS = "FETCH_LOAN_SUCCESS";
export const FETCH_LOAN_FAILURE = "FETCH_LOAN_FAILURE";

export const SAVE_LOAN_START = "SAVE_LOAN_START";
export const SAVE_LOAN_SUCCESS = "SAVE_LOAN_SUCCESS";
export const SAVE_LOAN_FAILURE = "SAVE_LOAN_FAILURE";

export const UPDATE_LOAN_START = "UPDATE_LOAN_START";
export const UPDATE_LOAN_SUCCESS = "UPDATE_LOAN_SUCCESS";
export const UPDATE_LOAN_FAILURE = "UPDATE_LOAN_FAILURE";

export const findAllLoan = () => {
  return async (dispatch) => {
    try {
      dispatch(findLoansStart());
      const { data } = await axios({
        url: `${config.api.base}${config.api.loans.findAll}`,
        method: "GET",
      });
      dispatch(findAllLoansSuccess(data));
    } catch (error) {
      dispatch(findLoansFailure(error));
    }
  };
};

export const findByIdLoan = (id) => {
  return async (dispatch) => {
    try {
      dispatch(findLoansStart());
      const { data } = await axios({
        url: `${config.api.base}${config.api.loans.findById}${id}`,
        method: "GET",
      });
      dispatch(findByIdLoanSuccess(data));
    } catch (error) {
      dispatch(findLoansFailure(error));
    }
  };
};

export const loanSelected = (loan) => ({
  type: LOAN_TYPE,
  payload: {
    loan,
  },
});

export const findLoansStart = () => ({
  type: LOAN_TYPE,
  payload: {
    fetching: true,
  },
});

export const findAllLoansSuccess = (loans) => ({
  type: LOAN_TYPE,
  payload: {
    fetching: false,
    loans,
  },
});

export const findByIdLoanSuccess = (loan) => ({
  type: LOAN_TYPE,
  payload: {
    fetching: false,
    loan,
  },
});

export const findLoansFailure = (error) => ({
  type: LOAN_TYPE,
  payload: {
    fetching: false,
    error,
  },
});

export const saveLoan = (loan) => {
  return async (dispatch) => {
    try {
      dispatch(saveLoanStart());
      await axios({
        url: `${config.api.base}${config.api.loans.save}`,
        method: "POST",
        data: {
          ...loan,
        },
      });
      dispatch(saveLoanSuccess());
    } catch (error) {
      dispatch(saveLoanFailure(error));
    }
  };
};

export const saveLoanStart = () => ({
  type: LOAN_TYPE,
  payload: {
    saving: true,
  },
});

export const saveLoanSuccess = () => ({
  type: LOAN_TYPE,
  payload: {
    saving: false,
  },
});

export const saveLoanFailure = (error) => ({
  type: LOAN_TYPE,
  payload: {
    saving: false,
    error,
  },
});

export const updateLoan = (id, loan) => {
  return async (dispatch) => {
    try {
      dispatch(updateLoanStart());
      await axios({
        url: `${config.api.base}${config.api.loans.update}${id}`,
        method: "PUT",
        data: {
          ...loan,
        },
      });
      dispatch(updateLoanSuccess());
    } catch (error) {
      dispatch(updateLoanFailure(error));
    }
  };
};

export const updateLoanStart = () => ({
  type: LOAN_TYPE,
  payload: {
    updating: true,
  },
});

export const updateLoanSuccess = () => ({
  type: LOAN_TYPE,
  payload: {
    updating: false,
  },
});

export const updateLoanFailure = (error) => ({
  type: LOAN_TYPE,
  payload: {
    updating: false,
    error,
  },
});
