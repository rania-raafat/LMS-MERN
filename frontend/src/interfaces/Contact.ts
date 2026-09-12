export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactsResponse {
  success: boolean;
  count: number;
  data: Contact[];
  message?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  data?: Contact;
}