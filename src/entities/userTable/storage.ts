import { BrowserStorageModel } from "../../utils/browserStorageModel";
import { initialUserRecords, type UserRecord } from "./model";

class RecordStorage extends BrowserStorageModel<"record"> {
  private records =
    import.meta.env.VITE_STORAGE === "local-storage" && this.get("record")
      ? JSON.parse(this.get("record")!)
      : initialUserRecords;

  public getRecords() {
    return this.records;
  }

  public setRecords(newRecords: UserRecord[]) {
    this.records = newRecords;
    if (import.meta.env.VITE_STORAGE === "local-storage") {
      console.log(newRecords);
      this.set("record", JSON.stringify(newRecords));
    }
  }
}

export const recordStorage = new RecordStorage();

recordStorage.setRecords(initialUserRecords);
