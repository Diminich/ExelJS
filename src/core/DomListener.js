import { capitalize } from "./utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root pordider for DomListener`);
        }

        this.$root = $root;
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Methid ${method} is not implemented in ${this.name} Component`)
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method]);
        })
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Methid ${method} is not implemented in ${this.name} Component`)
            }
            this.$root.off(listener, this[method]);
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}