const STORAGE_PREFIX: string = "biliomiUi.";

export class Storage {

  public static store(name: string, value: any) {
    localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(value));
  }

  public static get(name: string, defaultValue?: any) {
    let storageValue: string = localStorage.getItem(STORAGE_PREFIX + name);

    if (storageValue != null) {
      return JSON.parse(storageValue);
    } else {
      return defaultValue;
    }
  }

  public static unset(name: string) {
    localStorage.removeItem(STORAGE_PREFIX + name);
  }
}
