import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {IntentDiscoveryWidget} from "./components/IntentDiscoveryWidget.tsx";
import {ErrorState} from "./components/global/ErrorState.tsx";
import {Spinner} from "./components/global/Spinner.tsx";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";

type Props = {
    host: HTMLElement;
};

export const IntentDiscoveryWidgetWrapper = ({ host }: Props) => {
    const {config, error, loading} = useWidgetConfig(host);

    if (!config) return null;
    if (error) return <ErrorState />
    if (loading) return <Spinner />

    return  <SystemStateProvider config={config.integrations}>
                <IntentDiscoveryWidget config={config} />
            </SystemStateProvider>
};

