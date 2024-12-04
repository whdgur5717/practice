type LocalStorage = typeof window.localStorage;

export class BrowserStorageModel<T extends string> {
  #storage: LocalStorage;

  constructor(getStorage = (): LocalStorage => window.localStorage) {
    this.#storage = getStorage();
  }

  protected get(key: T): string | null {
    return this.#storage.getItem(key);
  }

  protected set(key: T, value: string) {
    return this.#storage.setItem(key, value);
  }

  protected remove(key: T) {
    this.#storage.removeItem(key);
  }
}
