import { ILocalDataClient } from "./ILocalDataClient";

class LocalDataClient implements ILocalDataClient {

    private static _instance: LocalDataClient;
    private readonly _storage: Storage;

    private constructor() {

        this._storage = localStorage;
    }

    get storage(): Storage {

        return this._storage;
    }

    public static getInstance(): LocalDataClient {

        if (!LocalDataClient._instance) {

            LocalDataClient._instance = new LocalDataClient();
        }

        return LocalDataClient._instance;
    }

    get(key: string): string | null {

        if (!key) {

            throw new Error("Param not found.");
        }

        const item = this.storage.getItem(key);
        return item || null;
    }

    insert(key: string, value: string): void {

        if (!key || !value) {

            throw new Error("Params not found.");
        }

        this.storage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }

    delete(key: string): void {

        if (!key) {

            throw new Error("Param not found.");
        }

        this.storage.removeItem(key);
    }
}

export default LocalDataClient;