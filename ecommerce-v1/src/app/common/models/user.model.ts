export interface IUser {
  username: string;
  password: string;
  user_id?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  country?: string;
  is_active?: boolean;
}

export const BLANK_USER: IUser = {
  username: '',
  password: '',
  user_id:''
}
