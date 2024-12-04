import { fields, type UserRecord } from "../../entities/userTable/model";
import { Form, Typography } from "antd";
import { useTheme } from "antd-style";
import { inputs } from "./columns";
import { Controller, useForm } from "react-hook-form";
import { cloneElement } from "react";

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

export const UserTableForm = () => {
  const form = useForm<UserRecord>({
    defaultValues: fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.label]: field.defaultValue,
      }),
      {} as UserRecord
    ),
  });

  return (
    <Form
      name="userTableForm"
      layout="vertical"
      requiredMark={RequiredMark}
      initialValues={fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.label]: field.defaultValue,
        }),
        {} as UserRecord
      )}
      onFinish={form.handleSubmit((values) => {
        console.log(values);
      })}
    >
      {inputs.map((input) => {
        return (
          <Controller
            name={input.label}
            key={input.label}
            control={form.control}
            render={({ field }) => {
              return (
                <Form.Item<inputType>
                  label={<FormLabel>{input.label}</FormLabel>}
                  name={input.label}
                  key={input.label}
                >
                  {cloneElement(input.render, { ...field })}
                </Form.Item>
              );
            }}
          />
        );
      })}
    </Form>
  );
};
