import { Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  fields,
  initialUserRecords,
  type UserRecord,
} from "../../entities/userTable/model";

interface DataType extends UserRecord {
  key: React.Key;
}

const columns: TableColumnsType<DataType> = fields.map((field) => {
  return {
    title: field.label,
    dataIndex: field.label,
  };
});

const dataSources: DataType[] = initialUserRecords.map((record, index) => ({
  ...record,
  key: index + 1,
}));

export const UserTable = () => {
  return <Table<DataType> dataSource={dataSources} columns={columns} />;
};
