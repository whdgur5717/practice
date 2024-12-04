import { Table, type TableProps } from "antd";
import { initialUserRecords } from "../../entities/userTable/model";
import { useState } from "react";
import type { DataType } from "./type";

const initialDataSources: DataType[] = initialUserRecords.map(
  (record, index) => ({
    ...record,
    key: index + 1,
  })
);

interface UserTableProps<T> {
  dataSource: TableProps<T>["dataSource"];
  columns: TableProps<T>["columns"];
}

export const UserTable = <T,>({ dataSource, columns }: UserTableProps<T>) => {
  const [tableData, setTableData] = useState(initialDataSources);

  return (
    <Table<T>
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      rowSelection={{
        type: "checkbox",
      }}
    />
  );
};
