import { fields, type UserRecord } from "../../entities/userTable/model";
import { Form, Typography } from "antd";
import { useTheme } from "antd-style";
import { inputs } from "./columns";
import { Controller, useForm } from "react-hook-form";
import { cloneElement, forwardRef, useImperativeHandle } from "react";

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
      initialData,
    }: {
      onSubmit: (data: UserRecord) => void;
      initialData: UserRecord | null;
    },
    ref
  ) => {
    const form = useForm<UserRecord>({
      defaultValues:
        initialData ||
        fields.reduce(
          (acc, field) => ({
            ...acc,
            [field.label]: field.defaultValue,
          }),
          {} as UserRecord
        ),
    });

    const handleSubmit = form.handleSubmit(onSubmit);

    useImperativeHandle(ref, () => ({
      submit: form.handleSubmit(onSubmit),
    }));

    return (
      <Form
        name="userTableForm"
        layout="vertical"
        requiredMark={RequiredMark}
        initialValues={
          initialData ||
          fields.reduce(
            (acc, field) => ({
              ...acc,
              [field.label]: field.defaultValue,
            }),
            {} as UserRecord
          )
        }
        onFinish={handleSubmit}
      >
        {inputs.map((input) => {
          return (
            <Controller
              name={input.label}
              key={input.label}
              control={form.control}
              rules={{ required: input.required }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Form.Item<inputType>
                    label={<FormLabel>{input.label}</FormLabel>}
                    name={input.label}
                    key={input.label}
                    required={input.required}
                  >
                    {input.type === "checkbox"
                      ? cloneElement(input.render, {
                          onChange,
                          onBlur,
                          checked: value,
                        })
                      : cloneElement(input.render, {
                          onChange,
                          onBlur,
                          value,
                        })}
                  </Form.Item>
                );
              }}
            />
          );
        })}
      </Form>
    );
  }
);
