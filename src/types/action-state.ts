export type AuthenticationFormState = {
  success?: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[] | string>;
}

export type DashboardFormState = {
  success?: boolean;
  fields?: Record<string, string | string[] | null | number>;
  errors?: Record<string, string[] | string>;
}

export type SimpleState = {
  success?: boolean;
  message?: string;
}