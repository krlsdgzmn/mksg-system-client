export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
};

export type SignInForm = {
  username: string;
  password: string;
};
