import { fields, type UserRecord } from "../../entities/userTable/model";
import { Form, Typography } from "antd";
import { useTheme } from "antd-style";
import { inputs } from "./columns";
import { forwardRef, useEffect, useImperativeHandle } from "react";

type inputType = UserRecord;

export const FormLabel = ({ children }: { children: React.ReactNode }) => {
  const token = useTheme();

  return (
    <Typography.Text
      strong
      style={{
        color: token.colorTextTertiary,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeightLG,
      }}
    >
      {children}
    </Typography.Text>
  );
};

const RequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => {
  const token = useTheme();

  return (
    <span style={{ display: "inline-flex", gap: token.marginXXS }}>
      {label}
      {required && (
        <span style={{ color: token.colorError, fontSize: token.fontSizeLG }}>
          *
        </span>
      )}
    </span>
  );
};

export const UserTableForm = forwardRef(
  (
    {
      onSubmit,
      editingData,
    }: {
      onSubmit: (data: UserRecord) => void;
      editingData: UserRecord | null;
    },
    ref
  ) => {
    const [form] = Form.useForm<UserRecord>();

    useImperativeHandle(ref, () => ({
      submit: () => form.submit(),
      reset: () => form.resetFields(),
    }));

    useEffect(() => {
      form.setFieldsValue(
        editingData ||
          fields.reduce(
            (acc, field) => ({
              ...acc,
              [field.label]: field.defaultValue,
            }),
            {} as UserRecord
          )
      );
    }, [editingData]);

    return (
      <Form
        name="userTableForm"
        layout="vertical"
        requiredMark={RequiredMark}
        form={form}
        onFinish={(data) => {
          onSubmit(data);
        }}
      >
        {inputs.map((input) => {
          return (
            <Form.Item<inputType>
              label={<FormLabel>{input.label}</FormLabel>}
              name={input.label}
              key={input.label}
              required={input.required}
              valuePropName={input.type === "checkbox" ? "checked" : "value"}
              rules={[{ required: input.required }]}
            >
              {input.render}
            </Form.Item>
          );
        })}
      </Form>
    );
  }
);
