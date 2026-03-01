
import type {MagentoCategory} from "../../types/infra/magento/category.types.ts";
import {useMagentoProducts} from "../infra/useMagentoProducts.tsx";

export function useFindProduct(categoryData: MagentoCategory) {
    const {
        magentoProducts,
        loading: productLoading,
        error: productError,
        refetch,
    } = useMagentoProducts(categoryData);

    const productData = magentoProducts

    return {
        productData,
        productLoading,
        productError,
        refetch,
    };
}