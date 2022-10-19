import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

const url = 'https://course-api.com/react-useReducer-cart-project';

// export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
//     return fetch(url)
//         .then((resp) => resp.json())
//         .catch((err) => console.log(err));
// })

export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, thunkAPI) => {
    try {
        console.log(thunkAPI.getState());
        const resp = await axios(url);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('There was an error');
    }
});


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: { // lifecycle actions pending/fulfilled/rejected
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload; // payload will hold resp.json()
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            // return {cartItems: []} from here will become a new state
            // values such as amount/total/isLoading will be lost
        },
        removeItem: (state,action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    }
})

export const { clearCart,removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;