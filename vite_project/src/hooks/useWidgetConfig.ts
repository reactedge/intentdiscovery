import {useEffect, useState} from "react";
import {readWidgetConfig} from "../IntentDiscoveryConfig.ts";
import {activity} from "../activity";
import type {ResolvedIntentDiscoveryConfig} from "../domain/intent-discovery.types.ts";

export function useWidgetConfig(
    host: HTMLElement
): {
    config: ResolvedIntentDiscoveryConfig | null;
    error: Error | null;
    loading: boolean;
} {

    const [config, setConfig] = useState<ResolvedIntentDiscoveryConfig | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function bootstrap() {
            try {
                setLoading(true);
                const resolved = await readWidgetConfig(host);

                if (!cancelled) {
                    setConfig(resolved);
                    setError(null);
                }
            } catch (err) {
                activity('bootstrap', 'Config error', {
                    error: (err as Error).message
                });

                if (!cancelled) {
                    setError(err as Error);
                    setConfig(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        bootstrap();

        return () => {
            cancelled = true;
        };

    }, [host]);

    return { config, error, loading };
}



