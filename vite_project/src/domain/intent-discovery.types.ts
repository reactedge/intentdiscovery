/* -------------------- */
/* Runtime              */
/* -------------------- */

export interface ReactEdgeRuntimeConfig {
    readonly integrations: ReactEdgeRuntimeIntegrations;
}

export interface ReactEdgeRuntimeIntegrations {
    readonly magentoGraphql: {
        readonly api: string;
    };
}

/* -------------------- */
/* Resolved Config      */
/* -------------------- */

export interface ResolvedIntentDiscoveryConfig {
    readonly data: IntentDiscoveryDataConfig;
    readonly integrations: ReactEdgeRuntimeIntegrations;
    readonly translations: IntentDiscoveryTranslationsConfig
}

export type IntentDiscoveryTranslationsConfig = Record<string, string> | undefined;

export type MagentoIntegrationName = 'magentoGraphql';

export interface IntentDiscoveryDataConfig {
    categoryUrlKey: string;
    attributes: [
        {
            code: string
        }
    ]
}