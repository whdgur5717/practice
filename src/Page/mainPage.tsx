import { Button, Flex, Modal, Typography } from "antd";
import { UserTable } from "./ui/UserTable";
import { PlusOutlined } from "@ant-design/icons";
import type { DataType } from "./ui/type";
import { initialUserRecords } from "../entities/userTable/model";
import { useState } from "react";
import { createColumns } from "./ui/columns";
import { UserTableForm } from "./ui/UserTableForm";
import { useTheme } from "antd-style";

const initialDataSources: DataType[] = initialUserRecords.map(
  (record, index) => ({
    ...record,
    key: index + 1,
  })
);

const MainPage = () => {
  const [tableData, setTableData] = useState(initialDataSources);

  const token = useTheme();

  const modalStyles = {
    header: {
      display: "flex",
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      alignItems: "flex-start",
      alignSelf: "stretch",
      gap: "10px",
      padding: `${token.paddingSM}px ${token.padding}px`,
    },
    body: {
      display: "flex",
      padding: `0px ${token.paddingContentHorizontalLG}px`,
      flexDirection: "column" as const,
      justifyContent: "center",
      gap: "20px",
    },
    content: {
      padding: 0,
    },
    footer: {
      padding: `${token.paddingSM}px ${token.padding}px`,
      gap: "8px",
      background: `${token.colorFillAlter}`,
    },
  };

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
      <Modal open={true} centered title="회원 추가" styles={{ ...modalStyles }}>
        <Flex gap="18px">
          <UserTableForm />
        </Flex>
      </Modal>
    </div>
  );
};

export default MainPage;
