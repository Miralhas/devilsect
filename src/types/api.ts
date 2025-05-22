export type ApiResponseError = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors?: Record<string, string>;
}

export type ApiLoginResponse = {
  accessToken: string;
  accessTokenExpiresIn: number;
}

