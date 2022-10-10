export class ActiveRouting {
    static get path() {
        return window.location.hash.slice(1)
    }

    static get param() {
        return ActiveRouting.path.split('/')[1]
    }

    static navigate(path) {
        window.location.hash = path
    }
}