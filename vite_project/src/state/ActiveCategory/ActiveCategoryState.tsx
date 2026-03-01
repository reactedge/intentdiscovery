import {createContext} from "react";
import type {ActiveCategoryInfoState, ActiveCategoryState} from "./type.ts";

export const readActiveCategory = (): ActiveCategoryInfoState => {
    return {
        categoryIds: [],
    }
}

export const LocalActiveCategoryStateContext = createContext<ActiveCategoryState | undefined>(undefined);