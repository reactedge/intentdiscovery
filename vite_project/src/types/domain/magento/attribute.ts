import type {IntentDiscoveryDataConfig} from "../../../domain/intent-discovery.types.ts";

export type OptionPreference = 'climate' | 'style_general' | 'price' | 'result' | (string & {})

export type MenOptionPreference = 'climate' | 'material' | 'size' | 'price' | 'result' | (string & {})


export const getNextPreferenceStep = (categoryData: IntentDiscoveryDataConfig, actionOptionCode: string): MenOptionPreference => {
    const layerAttributes = categoryData.attributes.map(attribute => attribute.code)

    if (actionOptionCode === "") {
        return layerAttributes[0]
    }

    let index = 0
    for (let i = 0; i< layerAttributes.length; i++) {
        if (actionOptionCode === layerAttributes[i]) {
            index = i
            break
        }
    }

    if (layerAttributes[index+1]) {
        return layerAttributes[index+1]
    }

    return 'result'
}