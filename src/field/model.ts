type FieldType = "text" | "textarea" | "date" | "select" | "checkbox";

type BaseField = {
  label: string;
  required: boolean;
};

type Field =
  | (BaseField & { type: Exclude<FieldType, "select"> })
  | (BaseField & { type: "select"; options: string[] });

export const Fields = [
  {
    type: "text",
    label: "이름",
    required: true,
  },
  {
    type: "text",
    label: "주소",
    required: false,
  },
  {
    type: "textarea",
    label: "메모",
    required: false,
  },
  {
    type: "date",
    label: "가입일",
    required: true,
  },
  {
    type: "select",
    label: "직업",
    required: false,
    options: ["개발자", "PO", "디자이너"],
  },
  {
    type: "checkbox",
    label: "이메일 수신 동의",
    required: false,
  },
] as const satisfies Field[];
