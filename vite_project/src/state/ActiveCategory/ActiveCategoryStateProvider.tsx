import {type ReactNode, useState} from "react";
import {LocalActiveCategoryStateContext, readActiveCategory} from "./ActiveCategoryState.tsx";
import type {ActiveCategoryInfoState} from "./type.ts";

interface ActiveCategoryStateProviderProps {
    children: ReactNode;
}

const LocalStateProvider = LocalActiveCategoryStateContext.Provider;

export const ActiveCategoryStateProvider: React.FC<ActiveCategoryStateProviderProps> = ({ children}) => {
    const [categoryState, setCategoryState] = useState<ActiveCategoryInfoState>(readActiveCategory());

    const setActiveCategoryIds = (categoryIds: number[]) => {
        setCategoryState({categoryIds})
    }

    return (
        <LocalStateProvider
            value={{
                setActiveCategoryIds,
                categoryState
            }}
        >
            {children}
        </LocalStateProvider>
    );
};
