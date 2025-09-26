export type AuthenticationFormState = {
  success?: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[] | string>;
}

export type SimpleState = {
  success?: boolean;
  message?: string;
}