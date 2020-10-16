import axios from "../helpers/axios";
import config from "../config";
import constants from "../store/constant";

export const COLLAPSE_MENU = "COLLAPSE_MENU";
export const COLLAPSE_TOGGLE = "COLLAPSE_TOGGLE";
export const FULL_SCREEN = "FULL_SCREEN";
export const FULL_SCREEN_EXIT = "FULL_SCREEN_EXIT";
export const CHANGE_LAYOUT = "CHANGE_LAYOUT";
export const NAV_CONTENT_LEAVE = "NAV_CONTENT_LEAVE";
export const NAV_COLLAPSE_LEAVE = "NAV_COLLAPSE_LEAVE";

export const LOAN_TYPE = "LOAN_TYPE";
export const AUTH_TYPE = "AUTH_TYPE";

export const FETCH_LOAN_START = "FETCH_LOAN_START";
export const FETCH_LOAN_SUCCESS = "FETCH_LOAN_SUCCESS";
export const FETCH_LOAN_FAILURE = "FETCH_LOAN_FAILURE";

export const SAVE_LOAN_START = "SAVE_LOAN_START";
export const SAVE_LOAN_SUCCESS = "SAVE_LOAN_SUCCESS";
export const SAVE_LOAN_FAILURE = "SAVE_LOAN_FAILURE";

export const UPDATE_LOAN_START = "UPDATE_LOAN_START";
export const UPDATE_LOAN_SUCCESS = "UPDATE_LOAN_SUCCESS";
export const UPDATE_LOAN_FAILURE = "UPDATE_LOAN_FAILURE";

export const findAllLoan = ({ active, page = 0, size = 10 } = {}) => {
  return async (dispatch) => {
    try {
      dispatch(findLoansStart());
      let url = `${config.api.base}${config.api.loans.findAll}?page=${page}&size=${size}`;
      if(active || active === false) url += `&active=${active}` 
      const { data } = await axios({
        url,
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

export const closeLoan = (id) => {
  return async (dispatch) => {
    try {
      dispatch(updateLoanStart());
      await axios.get(
        `${config.api.base}${config.api.loans.close.replace(':id', id)}`
      );
      dispatch(updateLoanSuccess());
    } catch (error) {
      dispatch(updateLoanFailure(error));
    }
  };
};

export const authenticate = (credentials) => {
  return async (dispatch) => {
    try {
      const { username, password } = credentials;
      dispatch(authStart());
      const credentialsdb64 = btoa(`${username}:${password}`);
      const {
        data: { id_token = "" },
      } = await axios({
        url: `${config.api.base}${config.api.auth.authenticate}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentialsdb64}`,
        },
      });
      const tokenFragment = id_token.substring(0, 10);
      window.localStorage.setItem(constants.LOGGED_IN, id_token);
      dispatch(authSuccess());
    } catch (error) {
      dispatch(authFailure(error));
    }
  };
};

export const authStart = () => ({
  type: AUTH_TYPE,
  payload: {
    authenticating: true,
  },
});

export const authSuccess = () => ({
  type: AUTH_TYPE,
  payload: {
    authenticating: false,
    loggedIn: true,
  },
});

export const authFailure = (error) => ({
  type: AUTH_TYPE,
  payload: {
    authenticating: false,
    loggedIn: false,
    error,
  },
});

export const logoutSuccess = () => ({
  type: AUTH_TYPE,
  payload: {
    loggedIn: false,
  },
});

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get(`${config.api.base}${config.api.auth.logout}`);
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(authFailure(error));
    }
  };
};
