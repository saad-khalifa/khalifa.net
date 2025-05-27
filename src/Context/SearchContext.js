import { createContext, useContext, useState } from "react";

export const Search=createContext("");
export default function SearchContext({children}){
    const [searching,setSearching]=useState("");
    return(
        <Search.Provider value={{searching,setSearching}}>{children}</Search.Provider>
    );
}
