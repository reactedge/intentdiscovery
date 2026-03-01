import {type ReactNode, useMemo} from "react";
import {LocalSystemStateContext} from "./SystemState.tsx";
import {createGraphqlClient} from "../../lib/graphql.ts";
import type {ReactEdgeRuntimeIntegrations} from "../../domain/intent-discovery.types.ts";

interface SystemStateProviderProps {
    children: ReactNode;
    config: ReactEdgeRuntimeIntegrations;
}

const LocalStateProvider = LocalSystemStateContext.Provider;

export const SystemStateProvider: React.FC<SystemStateProviderProps> = ({ children, config }) => {
    if (!config?.magentoGraphql?.api) {
        throw new Error('GraphQL client cannot be created without API endpoint');
    }

    const graphqlClient = useMemo(
        () => createGraphqlClient(config.magentoGraphql.api),
        [config.magentoGraphql?.api]
    );

    return (
        <LocalStateProvider
            value={{
                graphqlClient
            }}
        >
            {children}
        </LocalStateProvider>
    );
};
