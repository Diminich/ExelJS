import { isEqual } from "./utils";

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
        this.sub = null;
        this.prevState = {}
    }

    subscriberComponents(components) {
        this.prevState = this.store.getState();
        this.sub = this.store.subscribe((state) => {
            Object.keys(state).forEach((key) => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach((component) => {
                        if (component.isWatching(key)) {
                            const change = {[key]: state[key]};
                            component.storeChanged(change)
                        }
                    })
                }
            });
        });
    }

    unsubscriberFromStore() {
        this.sub.unsubscribe();
    }
}