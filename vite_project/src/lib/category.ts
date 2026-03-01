import type {MagentoCategory} from "../types/infra/magento/category.types.ts";

export const categoryLayereIds = (category?: MagentoCategory) => {
    let ids = category?.children.map((child: any) => {
        return child.id
    })

    if (!ids) {
        ids = []
    }
    ids.push(category.id)

    return ids
}