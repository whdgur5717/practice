import { Button, Dropdown, Flex, Modal, Typography } from "antd";
import { UserTable } from "./ui/UserTable";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import type { DataType } from "./ui/type";
import {
  initialUserRecords,
  type UserRecord,
} from "../entities/userTable/model";
import { useRef, useState } from "react";
import { createColumns } from "./ui/columns";
import { UserTableForm } from "./ui/UserTableForm";
import { useTheme } from "antd-style";

//record 데이터를 antd table에 맞게 가공(key 추가)
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
      borderTop: `1px solid ${token.colorSplit}`,
    },
  };

  const [open, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<
    (typeof tableData)[number] | null
  >(null);

  const formRef = useRef<{ submit: () => void }>(null);

  const onSubmitForm = (data: UserRecord) => {
    if (editingRecord) {
      setTableData((prev) =>
        prev.map((record) =>
          record.key === editingRecord.key
            ? { ...data, key: record.key } // data(UserRecord)에 key를 추가
            : record
        )
      );
    } else {
      setTableData((prev) => [...prev, { ...data, key: prev.length + 1 }]);
    }
    setOpen(false);
    setEditingRecord(null);
  };

  const onDeleteRecord = (key: string | React.Key) => {
    setTableData((prev) => prev.filter((record) => record.key !== key));
  };

  const onEditRecord = (record: DataType) => {
    setEditingRecord(record);
    setOpen(true);
  };

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Typography.Title level={5}>회원 목록</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          추가
        </Button>
      </Flex>
      <UserTable<DataType>
        dataSource={tableData}
        columns={[
          ...createColumns(tableData),
          {
            key: "action",
            render: (_, record) => (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "delete",
                      label: "삭제",
                      onClick: () => onDeleteRecord(record.key),
                    },
                    {
                      key: "edit",
                      label: "수정",
                      onClick: () => onEditRecord(record),
                    },
                  ],
                }}
              >
                <Button
                  type="text"
                  content="icon-only"
                  icon={<MoreOutlined />}
                />
              </Dropdown>
            ),
          },
        ]}
      />
      <Modal
        open={open}
        centered
        title="회원 추가"
        styles={{ ...modalStyles }}
        okText="저장"
        cancelText="취소"
        onOk={() => formRef.current?.submit()}
      >
        <div style={{ width: "100%" }}>
          <UserTableForm
            ref={formRef}
            onSubmit={onSubmitForm}
            initialData={editingRecord || null}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MainPage;
