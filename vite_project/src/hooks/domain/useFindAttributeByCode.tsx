import {useProductAttributes} from "../infra/useMagentoProductAttributes.tsx";

export function useFindAttributeByCode(code: string) {
    const { magentoAttributes } = useProductAttributes()

    const result = magentoAttributes?.filter((attribute) => attribute.code === code)

    return result && result.length>0? result[0]:null
}