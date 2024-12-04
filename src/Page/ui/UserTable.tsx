import { Table } from "antd";
import {
  initialUserRecords,
  type UserRecord,
} from "../../entities/userTable/model";
import { useState } from "react";
interface DataType extends UserRecord {
  key: React.Key;
}

const initialDataSources: DataType[] = initialUserRecords.map(
  (record, index) => ({
    ...record,
    key: index + 1,
  })
);

export const UserTable = () => {
  const [tableData, setTableData] = useState(initialDataSources);

  return <Table<DataType> />;
};
