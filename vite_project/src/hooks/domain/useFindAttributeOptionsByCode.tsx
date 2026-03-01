import {useProductAttributeLayer} from "../infra/useProductAttributeLayer.tsx";
import type {MagentoCategory} from "../../types/infra/magento/category.types.ts";

export const useFindAttributeOptionsByCode = (code: string, categoryData?: MagentoCategory) => {
    const {
        magentoAttributesLayer,
        loading: attributeLoading,
        error: attributeError,
        refetch
    } = useProductAttributeLayer(code, categoryData)

    const result = magentoAttributesLayer?.aggregations.filter((attribute: any) => attribute.attribute_code === code).map((attribute: any) => {
        return attribute
    })

    return {
        totalCount: magentoAttributesLayer?.total_count,
        attributeData: result?.length>0? result[0]: null,
        attributeLoading,
        attributeError,
        refetch,
    };
}
