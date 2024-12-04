import { type UserRecord } from "../../entities/userTable/model";
import type { DataType } from "./type";

type FilterData = {
  [K in keyof UserRecord]: { value: UserRecord[K]; text: UserRecord[K] }[];
};

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export const createFilters = (records: DataType[]) => {
  const filterData = (
    Object.keys(records[0]) as (keyof UserRecord)[]
  ).reduce<FilterData>(
    (acc, key) => ({
      ...acc,
      [key]: records.map((r) => {
        const value = r[key] as UserRecord[typeof key];
        return { text: value, value };
      }),
    }),
    {} as FilterData
  );

  return filterData;
};
