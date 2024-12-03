/* -----------------------------------------------------------------------------
 * 필수 필드 타입 정의
 * -------------------------------------------------------------------------- */

type FieldInputType = "text" | "textarea" | "date" | "select" | "checkbox";

type RequiredField = {
  type: FieldInputType;
  label: string;
  required: boolean;
}; // 필수 필드

/* -----------------------------------------------------------------------------
 * 필드 구성
 * type=select일 경우 options에 대한 타입 정의 필요
 * defaultValue 타입을 통해 입력값의 타입을 정의
 * -------------------------------------------------------------------------- */

const nameField = {
  type: "text" as const,
  label: "이름" as const,
  required: true,
  defaultValue: "",
};

const addressField = {
  type: "text" as const,
  label: "주소" as const,
  required: false,
  defaultValue: "",
};

const memoField = {
  type: "textarea" as const,
  label: "메모" as const,
  required: false,
  defaultValue: "",
};

const dateField = {
  type: "date" as const,
  label: "가입일" as const,
  required: true,
  defaultValue: "",
};

const jobOptions = ["개발자", "PO", "디자이너"] as const;

const jobField = {
  type: "select" as const,
  label: "직업" as const,
  required: false,
  options: jobOptions,
  defaultValue: "개발자" as (typeof jobOptions)[number],
};

const emailField = {
  type: "checkbox" as const,
  label: "이메일 수신 동의" as const,
  required: false,
  defaultValue: false,
};

type FieldData =
  | typeof nameField
  | typeof addressField
  | typeof memoField
  | typeof dateField
  | typeof jobField
  | typeof emailField;
//각 필드가 RequiredField를 만족하는지 검사 - 만족하지 않으면 never 타입 반환
type Validation = FieldData extends RequiredField ? FieldData : never;

export const fields = [
  nameField,
  addressField,
  memoField,
  dateField,
  jobField,
  emailField,
] as const satisfies Validation[];

export type UserRecord = {
  [K in (typeof fields)[number]["label"]]: Extract<
    (typeof fields)[number],
    { label: K }
  >["defaultValue"];
};

export const initialUserRecords = [
  {
    이름: "John Doe",
    주소: "서울 강남구",
    메모: "외국인",
    가입일: "2024-10-02",
    직업: "개발자",
    "이메일 수신 동의": true,
  },
  {
    이름: "Foo Bar",
    주소: "서울 서초구",
    메모: "한국인",
    가입일: "2024-10-01",
    직업: "PO",
    "이메일 수신 동의": false,
  },
] satisfies UserRecord[];
