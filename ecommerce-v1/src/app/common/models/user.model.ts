export interface IUser {
  username: string;
  password: string;
  _id?: string;
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
  _id:''
}
export class User{
  constructor(
    public username: string='',
    public password: string='',
    public _id: string='',
    public email: string='',
    public avatar: string='',
    public phone: string='',
    public isAdmin: boolean=false,
    public street: string='',
    public apartment: string = '',
    public zip: string= '',
    public city: string= '',
    public country: string= '',
    public is_active: boolean= true,
  ){}
}
