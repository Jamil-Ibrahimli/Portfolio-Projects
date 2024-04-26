import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from './../Components/Common/Main/Main';

interface CategoriesState {
    filteredData: IProduct[];
}

interface IFilterInputDatas {

    newData: IProduct[];
    inputData: string

}

const initialState: CategoriesState = {
    filteredData: []

};



const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,

    reducers: {
        filteredAll: (state, action: PayloadAction<IProduct[]>) => {


            state.filteredData = action.payload

        },

        filteredMen: (state, action: PayloadAction<IProduct[]>) => {

            state.filteredData = action.payload.filter(item => item.category === "men's clothing")
        },

        filterWomen: (state, action: PayloadAction<IProduct[]>) => {

            state.filteredData = action.payload.filter(item => item.category === "women's clothing")

        },

        filterJewelery: (state, action: PayloadAction<IProduct[]>) => {

            state.filteredData = action.payload.filter((item) => item.category === 'jewelery')

        },
        filterElectronics: (state, action: PayloadAction<IProduct[]>) => {

            state.filteredData = action.payload.filter((item) => item.category === 'electronics')
        },

        filterDiscounted: (state, action: PayloadAction<IProduct[]>) => {

            state.filteredData = action.payload.filter((item) => item.discountedPercent == 30)

        },

        filterInputData: (state, action: PayloadAction<IFilterInputDatas>) => {

            const { newData, inputData } = action.payload

            state.filteredData = newData.filter((item) =>
                item.category.toLocaleLowerCase().includes(inputData.toLocaleLowerCase().trim()) ||
                item.title.toLocaleLowerCase().includes(inputData.toLocaleLowerCase().trim())

            )

        },

    }
});

export const { filteredAll, filteredMen,
    filterWomen, filterJewelery,
    filterElectronics, filterDiscounted,
    filterInputData,
} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;