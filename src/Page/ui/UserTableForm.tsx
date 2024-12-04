import { fields, type UserRecord } from "../../entities/userTable/model";
import { Form, Input, Typography } from "antd";
import { useTheme } from "antd-style";

type FieldType = UserRecord;

export const UserTableForm = () => {
  const token = useTheme();

  return (
    <Form layout="vertical" style={{ width: "100%" }}>
      {fields.map((field) => {
        return (
          <Form.Item<FieldType>
            label={
              <Typography.Text
                strong
                style={{
                  color: token.colorTextTertiary,
                  fontSize: token.fontSizeLG,
                  lineHeight: token.lineHeightLG,
                }}
              >
                {field.label}
              </Typography.Text>
            }
            name={field.label}
            key={field.label}
            required={field.required}
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
