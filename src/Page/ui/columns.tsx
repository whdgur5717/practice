import { Checkbox, Input, Select, type TableColumnsType } from "antd";
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
      onFilter: (value, record) => record[nameField.label] === value,
    },
    {
      title: addressField.label,
      dataIndex: addressField.label,
      filters: filters[addressField.label],
      onFilter: (value, record) => record[addressField.label] === value,
    },
    {
      title: memoField.label,
      dataIndex: memoField.label,
      filters: filters[memoField.label],
      onFilter: (value, record) => record[memoField.label] === value,
    },
    {
      title: dateField.label,
      dataIndex: dateField.label,
      filters: filters[dateField.label],
      onFilter: (value, record) => record[dateField.label] === value,
    },
    {
      title: jobField.label,
      dataIndex: jobField.label,
      filters: filters[jobField.label],
      onFilter: (value, record) => record[jobField.label] === value,
    },
    {
      title: emailField.label,
      dataIndex: emailField.label,
      filters: filters[emailField.label],
      render: (_, record) => <Checkbox checked={record["이메일 수신 동의"]} />,
      onFilter: (value, record) => record[emailField.label] === value,
    },
  ];
};

export const inputs = [
  {
    ...nameField,
    render: <Input placeholder="Input" />,
  },
  { ...addressField, render: <Input placeholder="Input" /> },
  { ...memoField, render: <Input.TextArea size="large" rows={4} /> },
  {
    ...dateField,
    render: (
      <Input
        type={dateField.type}
        style={{ display: "inline-block", width: "auto" }}
      />
    ),
  },
  {
    ...jobField,
    placeholder: "Input",
    render: (
      <Select
        defaultValue={jobField.defaultValue}
        options={jobField.options.map((option) => ({
          value: option,
          label: option,
        }))}
        style={{ display: "inline-block", width: "auto" }}
      />
    ),
  },
  { ...emailField, render: <Checkbox checked={emailField.defaultValue} /> },
] as const;
