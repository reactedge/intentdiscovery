import type { IntentSignal, IntentState } from "./types.ts";

export class IntentEngine {
    private state: IntentState = {
        categoryScore: {},
        attributeScore: {},
        productScore: {},
        priceAffinity: {}
    }

    handle(signal: IntentSignal) {
        switch (signal.type) {
            case "category_view":
                this.bump(this.state.categoryScore, signal.id)
                break

            case "filter_select":
                if (!this.state.attributeScore[signal.attribute]) {
                    this.state.attributeScore[signal.attribute] = {}
                }
                this.bump(this.state.attributeScore[signal.attribute] as Record<string, number>, signal.value)
                break

            case "product_view":
                this.bump(this.state.productScore, signal.sku)
                break

            case "add_to_cart":
                this.bump(this.state.productScore, signal.sku)
                this.updatePriceAffinity(signal.price)
                break
        }
    }

    getState() {
        return this.state
    }

    private bump(map: Record<string, number>, key: string) {
        map[key] = (map[key] || 0) + 1
    }

    private updatePriceAffinity(price: number) {
        const { min, max, avg } = this.state.priceAffinity

        this.state.priceAffinity.min =
            min === undefined ? price : Math.min(min, price)

        this.state.priceAffinity.max =
            max === undefined ? price : Math.max(max, price)

        this.state.priceAffinity.avg =
            avg === undefined ? price : (avg + price) / 2
    }
}

export const createIntentEngine = () => new IntentEngine();
