import {useEffect, useState} from "react";
import {useSystemState} from "../../state/System/useSystemState.ts";
import {getError} from "../../lib/error.ts";
import {useOptionSelectionFilter} from "../domain/useOptionSelectionFilter.tsx";
import type {MagentoCategory} from "../../types/infra/magento/category.types.ts";

const QUERY = `
     query MagentoProducts($filter: ProductAttributeFilterInput!) {
      products(filter: $filter) {
        total_count
        aggregations{
          attribute_code
          label
          count
          options{
            count
            label
            value
          }
        }
      }
    }
`;

type ProductAttributesResponse = {
    products: any
}

export const useProductAttributeLayer = (attributeCode: string, categoryData: MagentoCategory) => {
    const [data, setData] = useState<ProductAttributesResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { graphqlClient } = useSystemState()

    const filter = useOptionSelectionFilter(categoryData)

    const load = async (filter: any) => {
        if (!filter) return;

        setLoading(true);
        setError(null);

        try {
            const result = await graphqlClient<ProductAttributesResponse>(
                QUERY,
                { filter }
            );
            setData(result);
        } catch (err: unknown) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(filter);
    }, [filter]);

    return {
        magentoAttributesLayer: data?.products,
        loading,
        error,
        refetch: load
    };
}
