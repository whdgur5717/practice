import { Table, type TableProps } from "antd";

interface UserTableProps<T> {
  dataSource: TableProps<T>["dataSource"];
  columns: TableProps<T>["columns"];
}

export const UserTable = <T,>({ dataSource, columns }: UserTableProps<T>) => {
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
