interface StorageItem {
    expired: number | null;
    value: any;
}

export default class Storage {
    private constructor() {}

    // expire: seconds
    public static put(key: string, value: any, expire?: number) {
        if (!window.localStorage) {
            return;
        }

        const item: StorageItem = {
            expired: null,
            value,
        };

        if (expire) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + expire);
            item.expired = date.getTime();
        }

        window.localStorage.setItem(key, JSON.stringify(item));
    }

    public static get(key: string) {
        if (!window.localStorage) {
            return null;
        }

        const item = window.localStorage.getItem(key);
        if (!item) {
            return null;
        }

        const parsedItem: StorageItem = JSON.parse(item as string);
        if (!parsedItem.expired) {
            return parsedItem.value;
        }

        const now = new Date();
        if (now.getTime() > parsedItem.expired) {
            window.localStorage.removeItem(key);
            return null;
        }

        return parsedItem.value;
    }

    public static remove(key: string) {
        window.localStorage.removeItem(key);
    }

    public static clear() {
        window.localStorage.clear();
    }
};