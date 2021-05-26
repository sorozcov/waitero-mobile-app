import * as types from '../types/reservations';

export const postReservation = reservation => ({
    type: types.RESERVATION_COMPLETED,
    payload: reservation,
});

export const selectReservation = id => ({
    type: types.RESERVATION_SELECTED,
    payload: id,
})