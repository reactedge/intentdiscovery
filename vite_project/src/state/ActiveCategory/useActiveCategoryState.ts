import {useContext} from "react";
import {LocalActiveCategoryStateContext} from "./ActiveCategoryState.tsx";
import type {ActiveCategoryState} from "./type.ts";

export function useActiveCategoryState(): ActiveCategoryState {
    const context = useContext(LocalActiveCategoryStateContext);
    if (!context) {
        throw new Error("useActiveCategoryState must be used within ActiveCategoryStateProvider");
    }
    return context;
}