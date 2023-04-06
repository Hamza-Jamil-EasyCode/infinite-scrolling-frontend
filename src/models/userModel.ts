
export interface AddressModel {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
}

export interface UsersModel {
  _id?: string;
  name: string;
  email: string;
  address: AddressModel;
  role: 'internee' | 'junior' | 'senior';
  phoneNumber: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
