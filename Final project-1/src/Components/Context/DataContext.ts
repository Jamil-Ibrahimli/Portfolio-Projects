import { IProduct } from './../Common/Main/Main';
import { createContext } from "react";



export const DataContext = createContext<{ data: IProduct[]; setData: (value: IProduct[]) => void}> ({
    data: [],
    setData: () => { }
});