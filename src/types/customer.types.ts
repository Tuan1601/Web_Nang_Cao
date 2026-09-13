export enum CustomerStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Banned = 'BANNED',
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCustomerDto = Omit<Customer, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
export type UpdateCustomerDto = Partial<Pick<Customer, 'name' | 'phone' | 'address' | 'status'>>;
export type CustomerPreview = Pick<Customer, 'id' | 'name' | 'email' | 'status'>;
