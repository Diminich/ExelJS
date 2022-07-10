export class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error(`No $root pordider for DomListener`)
        }

        this.$root = $root
    }
}