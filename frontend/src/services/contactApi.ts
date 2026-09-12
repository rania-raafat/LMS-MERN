import type {
  Contact,
  CreateContactData,
  ContactsResponse,
  ContactResponse,
} from "../interfaces/Contact";

import api from "../interceptors/axiosInterceptor";

const API_URL = "/api/contacts";

// =====================================================
// CREATE CONTACT
// POST /api/contacts
// Public endpoint
// =====================================================

export const createContact = async (
  data: CreateContactData,
): Promise<Contact> => {
  const response =
    await api.post<ContactResponse>(
      API_URL,
      data,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to send contact message",
    );
  }

  return response.data.data;
};

// =====================================================
// GET CONTACTS
// GET /api/contacts
// Protected endpoint
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const getContacts =
  async (): Promise<Contact[]> => {
    const response =
      await api.get<ContactsResponse>(
        API_URL,
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Failed to fetch contacts",
      );
    }

    return response.data.data;
  };

// =====================================================
// DELETE CONTACT
// DELETE /api/contacts/:id
// Protected endpoint
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const deleteContact = async (
  id: string,
): Promise<void> => {
  const response =
    await api.delete<ContactResponse>(
      `${API_URL}/${id}`,
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message ||
        "Failed to delete contact message",
    );
  }
};