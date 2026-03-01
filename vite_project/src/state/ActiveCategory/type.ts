export interface ActiveCategoryInfoState {
    categoryIds: number[]
}

export interface ActiveCategoryState {
    categoryState: ActiveCategoryInfoState
    setActiveCategoryIds: (categoryIds: number[]) => void
}