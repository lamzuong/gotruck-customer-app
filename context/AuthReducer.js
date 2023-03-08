export const INITIAL_STATE = {
  user: null,
  listOrder: null,
  locationNow: {
    address: '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh',
    latitude: 10.820685,
    longitude: 106.687631,
  },
};
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload };
    case 'SET_LIST_ORDER':
      return { ...state, listOrder: [...action.payload] };
    case 'SET_LOCATION':
      return { ...state, locationNow: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
