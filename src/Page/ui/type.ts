import type { UserRecord } from "../../entities/userTable/model";

export interface DataType extends UserRecord {
  key: React.Key;
}
