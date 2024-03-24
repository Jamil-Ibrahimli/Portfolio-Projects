import { IProduct } from './../Components/Common/Main/Main';
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState = {

    cart: JSON.parse(localStorage.getItem('cart') || '[]') as IProduct[]

}

const addToCartSlice = createSlice({

    name: 'products',

    initialState,

    reducers: {

        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existingItem = state.cart.find((item) => item.id === action.payload.id)

            if (!existingItem && action.payload.count === 0) {


                state.cart.push({ ...action.payload, count: 1 })

            }

            else if (!existingItem && action.payload.count > 0) {

                state.cart.push({ ...action.payload })

            }
            else {

                existingItem ? (existingItem.count+=action.payload.count||1) : null
               
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },


        incrementCount: (state, action: PayloadAction<IProduct>) => {
            const existingItem = state.cart.find((item) => item.id === action.payload.id)

            if (existingItem) {

                existingItem.count++

                localStorage.setItem('cart', JSON.stringify(state.cart))

            }


        },

        decrementCount: (state, action: PayloadAction<IProduct>) => {

            const existingItem = state.cart.find((item) => item.id === action.payload.id)

            if (existingItem && existingItem.count > 1) {
                existingItem.count--
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }


        },

        removeItem: (state, action: PayloadAction<IProduct>) => {

            state.cart = state.cart.filter((item) => item.id !== action.payload.id)

            localStorage.setItem('cart', JSON.stringify(state.cart))

        }




    },




}


)


export const { addToCart, removeItem, incrementCount, decrementCount } = addToCartSlice.actions
export default addToCartSlice.reducer