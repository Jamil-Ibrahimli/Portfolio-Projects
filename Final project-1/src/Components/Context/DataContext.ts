import { Profile } from './../../App';
import { IProduct } from './../Common/Main/Main';
import { createContext } from "react";




export const DataContext = createContext<{
  data: IProduct[];
  setData: (value: IProduct[]) => void;
  login: (value: Object) => void;
  profile: Profile | null;
  logOut: (value: Object) => void;
  loggedIn:boolean;
  setLoggedIn:(value:boolean)=>void;

}>({
  data: [],
  setData: () => { },
  login: () => { },
  profile: null,
  logOut: () => { },
  loggedIn:false,
  setLoggedIn:()=>{}
});

