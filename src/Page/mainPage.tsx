import { Button, Flex, Typography } from "antd";
import { UserTable } from "./ui/UserTable";
import { PlusOutlined } from "@ant-design/icons";
import type { DataType } from "./ui/type";
import { initialUserRecords } from "../entities/userTable/model";
import { useState } from "react";
import { createColumns } from "./ui/columns";

const initialDataSources: DataType[] = initialUserRecords.map(
  (record, index) => ({
    ...record,
    key: index + 1,
  })
);

const MainPage = () => {
  const [tableData, setTableData] = useState(initialDataSources);

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ padding: "8px 14px" }}
      >
        <Typography.Title level={5}>회원 목록</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />}>
          추가
        </Button>
      </Flex>
      <UserTable<DataType>
        dataSource={tableData}
        columns={createColumns(tableData)}
      />
    </div>
  );
};

export default MainPage;
