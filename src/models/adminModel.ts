export interface AdminsModel {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  name: string;
  password: string;
}
