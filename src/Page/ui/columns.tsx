import { Checkbox, type TableColumnsType } from "antd";
import {
  jobField,
  nameField,
  addressField,
  memoField,
  emailField,
  dateField,
  type UserRecord,
} from "../../entities/userTable/model";
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
        return { text: String(value), value };
      }),
    }),
    {} as FilterData
  );

  return filterData;
};

export const createColumns = (
  records: DataType[]
): TableColumnsType<DataType> => {
  const filters = createFilters(records);

  return [
    {
      title: nameField.label,
      dataIndex: nameField.label,
      filters: filters[nameField.label],
    },
    {
      title: addressField.label,
      dataIndex: addressField.label,
      filters: filters[addressField.label],
    },
    {
      title: memoField.label,
      dataIndex: memoField.label,
      filters: filters[memoField.label],
    },
    {
      title: dateField.label,
      dataIndex: dateField.label,
      filters: filters[dateField.label],
    },
    {
      title: jobField.label,
      dataIndex: jobField.label,
      filters: filters[jobField.label],
    },
    {
      title: emailField.label,
      dataIndex: emailField.label,
      filters: filters[emailField.label],
      render: (_, record) => <Checkbox checked={record["이메일 수신 동의"]} />,
    },
  ];
};
