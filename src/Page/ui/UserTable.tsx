import { Table } from "antd";
import { initialUserRecords } from "../../entities/userTable/model";
import { useState } from "react";
import { createColumns } from "./columns";
import type { DataType } from "./type";

const initialDataSources: DataType[] = initialUserRecords.map(
  (record, index) => ({
    ...record,
    key: index + 1,
  })
);

export const UserTable = () => {
  const [tableData, setTableData] = useState(initialDataSources);

  return (
    <Table<DataType>
      dataSource={tableData}
      columns={createColumns(tableData)}
    />
  );
};
