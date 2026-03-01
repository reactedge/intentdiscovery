import { mountWidget } from "./mountWidget";

class IntentDiscoveryWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("intentdiscovery-widget", IntentDiscoveryWidget);
