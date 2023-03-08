export const LoginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const SetListOrder = (orderList) => ({
    type: 'SET_LIST_ORDER',
    payload: orderList,
});

export const SetLocation = (address) => ({
    type: 'SET_LOCATION',
    payload: address,
});