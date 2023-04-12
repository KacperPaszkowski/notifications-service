import * as React from 'react';
import { useState, useContext } from 'react';

export interface IFilter{
    acceptSender: string;
    error: boolean;
    warning: boolean;
    info: boolean;
    success: boolean;
}

export interface IFilterContext{
    filter: IFilter;
    setFilter: (filter: IFilter) => void
}

interface IFilterContextProviderProps{
    children: string | JSX.Element | JSX.Element[]
}

export const FilterContext = React.createContext<IFilterContext | any>({})

export const FilterContextProvider = ({children}: IFilterContextProviderProps) => {
    const [filter, setFilter] = useState<IFilter>({
        acceptSender: '',
        error: true,
        warning: true,
        info: true,
        success: true,
    });

    return (
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}