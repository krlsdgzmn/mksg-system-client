export type RawUserMetaData = {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
};

export type AuthUserResponse = {
  id: string;
  raw_user_meta_data: RawUserMetaData;
  updated_at: string;
  last_sign_in_at: string;
};
