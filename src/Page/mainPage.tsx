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
import { recordStorage } from "../entities/userTable/storage";

//record 데이터를 antd table에 맞게 가공(key 추가)
const initialDataSources: DataType[] = initialUserRecords.map(
  (record, index) => ({
    ...record,
    key: `${record.이름} ${index + 1}`,
  })
);

const MainPage = () => {
  const [tableData, setTableData] = useState(initialDataSources);
  const [storage, _] = useState(recordStorage);

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

  //폼 관련 로직
  const formRef = useRef<{ submit: () => void; reset: () => void }>(null);

  const [editingRecord, setEditingRecord] = useState<
    (typeof tableData)[number] | null
  >(null); //수정 시 레코드 저장

  const onSubmitForm = (data: UserRecord) => {
    const newRecords = editingRecord
      ? tableData.map(
          (
            record // 수정 모드
          ) =>
            record.key === editingRecord.key
              ? { ...data, key: editingRecord.key } // 기존 key 유지
              : record
        )
      : [
          // 추가 모드
          ...tableData,
          { ...data, key: `${data.이름} ${tableData.length + 1}` },
        ];

    setTableData(newRecords);
    setOpen(false);
    setEditingRecord(null);
    storage.setRecords(newRecords);
    formRef.current?.reset();
  };

  const onDeleteRecord = (key: string | React.Key) => {
    const newRecords = tableData.filter((record) => record.key !== key);
    setTableData(newRecords);
    storage.setRecords(newRecords);
  };

  const onEditRecord = (record: DataType) => {
    setEditingRecord(record);
    setOpen(true);
  };

  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{
          borderBottom: `1px solid ${token.colorSplit}`,
          background: `${token.colorBgContainer}`,
          padding: "8px 14px",
        }}
      >
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
        okButtonProps={{ disabled: !isFormValid }}
        cancelText="취소"
        onOk={() => formRef.current?.submit()}
        onCancel={() => {
          setOpen(false);
          formRef.current?.reset();
          setEditingRecord(null);
        }}
      >
        <div style={{ width: "100%" }}>
          <UserTableForm
            ref={formRef}
            onSubmit={onSubmitForm}
            editingData={editingRecord || null}
            onFormValuesChange={setIsFormValid}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MainPage;
