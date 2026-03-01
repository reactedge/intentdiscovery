import {useMagentoCategory} from "../infra/useMagentoCategory.tsx";

export function useCategory(urlKey: string) {
    const {
        magentoCategory,
        loading: categoryLoading,
        error: categoryError,
        refetch,
    } = useMagentoCategory(urlKey);

    const categoryData = magentoCategory;

    return {
        categoryData,
        categoryLoading,
        categoryError,
        refetch,
    };
}