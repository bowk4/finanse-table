import { createSlice } from '@reduxjs/toolkit';
import { saveStorageAuthorizationStatus } from "../utilities/utilities"


const initialState = {
	isAuthorized: false,
	isFormAuthorizationOpen: false,
	priceTickersArray: [],
	favoriteList: [],
	order: 'desc',
	orderBy: 'price',
}


export const FinanceAppSlice = createSlice({
	name: "finance",
	initialState,
	reducers: {
		setPriceTickersArray: (state, action) => {
			state.priceTickersArray = action.payload;
		},
		setFavoriteList: (state, action) => {
			if (state.favoriteList.includes(action.payload)) {
				state.favoriteList = state.favoriteList.filter(item => item !== action.payload);
			} else {
				state.favoriteList.push(action.payload);
			}
		},
		setOrder: (state, action) => {
			state.order = action.payload;
		},
		setOrderBy: (state, action) => {
			state.orderBy = action.payload;
		},
		LOG_IN: (state) => {
			saveStorageAuthorizationStatus(true);
			state.isAuthorized = true;
		},
		LOG_OUT: (state) => {
			saveStorageAuthorizationStatus(false);
			state.isAuthorized = false;
		},
		FORM_AUTHORIZATION_OPEN: (state) => {
			state.isFormAuthorizationOpen = true;
		},
		FORM_AUTHORIZATION_CLOSE: (state) => {
			state.isFormAuthorizationOpen = false;
		},
	},
});


export const {
	setPriceTickersArray,
	setFavoriteList,
	setOrder,
	setOrderBy,
	LOG_IN,
	LOG_OUT,
	FORM_AUTHORIZATION_OPEN,
	FORM_AUTHORIZATION_CLOSE
} = FinanceAppSlice.actions
export default FinanceAppSlice.reducer;


