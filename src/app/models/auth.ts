export interface LoginDto {
  username: string;
  password: string;
}

export interface LoggedInDto {
  access_token: string;
  refresh_token: string;
}
