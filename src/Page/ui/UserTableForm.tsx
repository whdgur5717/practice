import { fields, type UserRecord } from "../../entities/userTable/model";
import { Form, Input, Typography } from "antd";
import { useTheme } from "antd-style";

type FieldType = UserRecord;

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

export const UserTableForm = () => {
  const token = useTheme();

  return (
    <Form
      layout="vertical"
      style={{ width: "100%" }}
      requiredMark={RequiredMark}
    >
      {fields.map((field) => {
        return (
          <Form.Item<FieldType>
            label={<FormLabel>{field.label}</FormLabel>}
            name={field.label}
            key={field.label}
            rules={[
              {
                required: field.required,
                message: `${field.label} is required`,
              },
            ]}
            style={{
              display: "flex",
              flexDirection: "column",
              color: token.colorTextTertiary,
            }}
          >
            <Input />
          </Form.Item>
        );
      })}
    </Form>
  );
};
