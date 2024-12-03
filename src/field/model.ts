type FieldType = "text" | "textarea" | "date" | "select" | "checkbox";

type BaseField = {
  label: string;
  required: boolean;
};

type Field =
  | (BaseField & { type: Exclude<FieldType, "select"> })
  | (BaseField & { type: "select"; options: string[] });
