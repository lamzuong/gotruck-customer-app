export const INITIAL_STATE = {
  user: null,
  locationNow: null,
  listOrder: null,
};
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
      };
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'LOGIN_FAILURE':
      return {
        user: null,
      };
    case 'GET_LIST_ORDER':
      return { ...state, listOrder: [...action.payload] };
    default:
      return state;
  }
};

export default AuthReducer;
