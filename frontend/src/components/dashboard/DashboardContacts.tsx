import { useEffect, useMemo, useState } from "react";

import {
  FiCheck,
  FiClock,
  FiEye,
  FiMail,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import type { Contact } from "../../interfaces/Contact";

import {
  deleteContact,
  getContacts,
} from "../../services/contactApi";

import DeleteConfirmModal from "../../shared-components/DeleteConfirmModal";

interface NotificationState {
  type: "success" | "error";
  message: string;
}

interface StoredNotification {
  id: string;
  title: string;
  message: string;
  type: "course" | "contact" | "system";
  createdAt: string;
  read: boolean;
}

const NOTIFICATIONS_KEY = "lms_notifications";
const KNOWN_CONTACTS_KEY =
  "lms_known_contact_ids";

const DashboardContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(
    [],
  );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [search, setSearch] = useState("");

  const [contactToDelete, setContactToDelete] =
    useState<Contact | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  const [notification, setNotification] =
    useState<NotificationState | null>(null);

  const showNotification = (
    type: NotificationState["type"],
    message: string,
  ) => {
    setNotification({
      type,
      message,
    });

    window.setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const addNotification = (
    title: string,
    message: string,
    type: StoredNotification["type"],
  ) => {
    const stored = localStorage.getItem(
      NOTIFICATIONS_KEY,
    );

    const notifications: StoredNotification[] =
      (() => {
        if (!stored) {
          return [];
        }

        try {
          const parsed: unknown =
            JSON.parse(stored);

          if (!Array.isArray(parsed)) {
            return [];
          }

          return parsed as StoredNotification[];
        } catch {
          return [];
        }
      })();

    const newNotification: StoredNotification = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
    };

    localStorage.setItem(
      NOTIFICATIONS_KEY,
      JSON.stringify([
        newNotification,
        ...notifications,
      ]),
    );

    window.dispatchEvent(
      new Event(
        "lms-notifications-updated",
      ),
    );
  };

  const detectNewContacts = (
    currentContacts: Contact[],
  ) => {
    const stored = localStorage.getItem(
      KNOWN_CONTACTS_KEY,
    );

    let knownIds: string[] = [];

    if (stored) {
      try {
        const parsed: unknown =
          JSON.parse(stored);

        if (Array.isArray(parsed)) {
          knownIds = parsed.filter(
            (id): id is string =>
              typeof id === "string",
          );
        }
      } catch {
        knownIds = [];
      }
    }

    if (!stored) {
      const ids = currentContacts.map(
        (contact) => contact._id,
      );

      localStorage.setItem(
        KNOWN_CONTACTS_KEY,
        JSON.stringify(ids),
      );

      return;
    }

    const newContacts =
      currentContacts.filter(
        (contact) =>
          !knownIds.includes(contact._id),
      );

    if (newContacts.length > 0) {
      newContacts.forEach((contact) => {
        addNotification(
          "New Contact Message",
          `"${contact.name}" sent a new message: "${contact.subject}".`,
          "contact",
        );
      });
    }

    const allKnownIds = Array.from(
      new Set([
        ...knownIds,
        ...currentContacts.map(
          (contact) => contact._id,
        ),
      ]),
    );

    localStorage.setItem(
      KNOWN_CONTACTS_KEY,
      JSON.stringify(allKnownIds),
    );
  };

  const fetchContacts = async (
    showRefreshLoader = false,
  ) => {
    try {
      if (showRefreshLoader) {
        setIsRefreshing(true);
      }

      const data = await getContacts();

      setContacts(data);

      detectNewContacts(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load contact messages.";

      showNotification(
        "error",
        message,
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadContacts = async () => {
      try {
        const data = await getContacts();

        if (!isMounted) {
          return;
        }

        setContacts(data);
        detectNewContacts(data);
        setIsLoading(false);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Failed to load contact messages.";

        showNotification(
          "error",
          message,
        );

        setIsLoading(false);
      }
    };

    void loadContacts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredContacts = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return contacts;
    }

    return contacts.filter((contact) => {
      return (
        contact.name
          .toLowerCase()
          .includes(query) ||
        contact.email
          .toLowerCase()
          .includes(query) ||
        contact.subject
          .toLowerCase()
          .includes(query) ||
        contact.message
          .toLowerCase()
          .includes(query)
      );
    });
  }, [contacts, search]);

  const handleDeleteContact = async () => {
    if (!contactToDelete) {
      return;
    }

    const contactId =
      contactToDelete._id;

    const contactName =
      contactToDelete.name;

    const contactSubject =
      contactToDelete.subject;

    try {
      setIsDeleting(true);

      await deleteContact(contactId);

      setContacts(
        (currentContacts) =>
          currentContacts.filter(
            (contact) =>
              contact._id !== contactId,
          ),
      );

      const stored =
        localStorage.getItem(
          KNOWN_CONTACTS_KEY,
        );

      if (stored) {
        try {
          const parsed: unknown =
            JSON.parse(stored);

          if (Array.isArray(parsed)) {
            const knownIds = parsed.filter(
              (id): id is string =>
                typeof id === "string",
            );

            localStorage.setItem(
              KNOWN_CONTACTS_KEY,
              JSON.stringify(
                knownIds.filter(
                  (id) =>
                    id !== contactId,
                ),
              ),
            );
          }
        } catch {
          // Ignore invalid localStorage data.
        }
      }

      addNotification(
        "Contact Deleted",
        `"${contactName}" — "${contactSubject}" was deleted.`,
        "contact",
      );

      showNotification(
        "success",
        "Contact message deleted successfully.",
      );

      setContactToDelete(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete contact message.";

      showNotification(
        "error",
        message,
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (
    dateString: string,
  ) => {
    const date =
      new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    );
  };

  const formatTime = (
    dateString: string,
  ) => {
    const date =
      new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-hidden">
      {/* ==================================================
          TOAST
      ================================================== */}

      {notification && (
        <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm">
          <div
            className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl ${
              notification.type ===
              "success"
                ? "border-emerald-200"
                : "border-red-200"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                notification.type ===
                "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {notification.type ===
              "success" ? (
                <FiCheck size={18} />
              ) : (
                <FiX size={18} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#2C2825]">
                {notification.type ===
                "success"
                  ? "Success"
                  : "Something went wrong"}
              </p>

              <p className="mt-0.5 break-words text-xs leading-5 text-[#756D66]">
                {notification.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotification(null)
              }
              className="rounded-lg p-1.5 text-[#9B928A] transition hover:bg-[#F7F5F2] hover:text-[#2C2825]"
              aria-label="Close notification"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-[#8B8179]">
            Management
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#2C2825] sm:text-3xl">
            Contact Messages
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-[#756D66]">
            View and manage messages submitted
            through your LMS contact form.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            void fetchContacts(true)
          }
          disabled={isRefreshing}
          className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-[#D8D1CA] bg-white px-4 text-sm font-semibold text-[#625B55] transition hover:border-[#BEB5AC] hover:bg-[#F7F5F2] hover:text-[#2C2825] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <FiRefreshCw
            size={17}
            className={
              isRefreshing
                ? "animate-spin"
                : ""
            }
          />

          <span>
            {isRefreshing
              ? "Refreshing..."
              : "Refresh"}
          </span>
        </button>
      </div>

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="mb-6 rounded-2xl border border-[#D8D1CA] bg-white p-4">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full min-w-0 sm:max-w-md">
            <FiSearch
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9B928A]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search messages..."
              className="w-full min-w-0 rounded-xl border border-[#D8D1CA] bg-[#F7F5F2] py-2.5 pl-10 pr-4 text-sm text-[#2C2825] outline-none transition placeholder:text-[#9B928A] focus:border-[#2C2825] focus:bg-white"
            />
          </div>

          <p className="shrink-0 text-xs text-[#8B8179]">
            Showing{" "}
            <span className="font-semibold text-[#625B55]">
              {filteredContacts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#625B55]">
              {contacts.length}
            </span>{" "}
            messages
          </p>
        </div>
      </div>

      {/* ==================================================
          MESSAGES CONTAINER
      ================================================== */}

      <div className="w-full overflow-hidden rounded-2xl border border-[#D8D1CA] bg-white">
        <div className="flex min-w-0 items-center justify-between border-b border-[#D8D1CA] px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-[#2C2825]">
              Messages
            </h3>

            <p className="mt-0.5 truncate text-xs text-[#9B928A]">
              Manage contact form submissions
            </p>
          </div>

          {contacts.length > 0 && (
            <span className="ml-3 shrink-0 rounded-full bg-[#F7F5F2] px-3 py-1 text-xs font-medium text-[#756D66]">
              {contacts.length} total
            </span>
          )}
        </div>

        {/* ==================================================
            LOADING
        ================================================== */}

        {isLoading ? (
          <div className="space-y-4 p-4 sm:p-5">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-xl border border-[#EEE9E4] p-4"
                >
                  <div className="space-y-3">
                    <div className="h-4 w-1/3 max-w-[220px] rounded bg-[#EEE9E4]" />

                    <div className="h-3 w-2/3 max-w-[400px] rounded bg-[#EEE9E4]" />

                    <div className="h-3 w-full max-w-[600px] rounded bg-[#EEE9E4]" />
                  </div>
                </div>
              ),
            )}
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex min-h-72 items-center justify-center px-5 py-12">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F5F2] text-[#8B8179]">
                <FiMail size={22} />
              </div>

              <h4 className="text-sm font-semibold text-[#2C2825]">
                No messages yet
              </h4>

              <p className="mt-1.5 text-xs leading-5 text-[#9B928A]">
                Contact messages will appear
                here when someone submits the
                contact form.
              </p>
            </div>
          </div>
        ) : filteredContacts.length ===
          0 ? (
          <div className="flex min-h-64 items-center justify-center px-5 py-12">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5F2] text-[#8B8179]">
                <FiSearch size={20} />
              </div>

              <p className="text-sm font-medium text-[#625B55]">
                No matching messages
              </p>

              <p className="mt-1 text-xs text-[#9B928A]">
                Try a different search term.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="mt-4 text-xs font-semibold text-[#2C2825] underline underline-offset-4"
              >
                Clear search
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ==================================================
                DESKTOP SWIPER
                4 CONTACTS PER PAGE
            ================================================== */}

            <div className="hidden md:block p-4 sm:p-5">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={16}
                slidesPerView={1}
                className="contacts-swiper !pb-12"
              >
                {Array.from({
                  length: Math.ceil(
                    filteredContacts.length / 4,
                  ),
                }).map((_, pageIndex) => {
                  const pageContacts =
                    filteredContacts.slice(
                      pageIndex * 4,
                      pageIndex * 4 + 4,
                    );

                  return (
                    <SwiperSlide
                      key={`contacts-page-${pageIndex}`}
                    >
                      <div className="overflow-hidden rounded-xl border border-[#EEE9E4]">
                        <table className="w-full table-fixed">
                          <thead>
                            <tr className="border-b border-[#EEE9E4] bg-[#FCFBFA]">
                              <th className="w-[22%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                Contact
                              </th>

                              <th className="w-[18%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                Subject
                              </th>

                              <th className="w-[32%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                Message
                              </th>

                              <th className="w-[14%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                Received
                              </th>

                              <th className="w-[14%] px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                Actions
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {pageContacts.map(
                              (contact) => (
                                <tr
                                  key={
                                    contact._id
                                  }
                                  className="border-b border-[#EEE9E4] last:border-b-0 transition hover:bg-[#FCFBFA]"
                                >
                                  <td className="px-4 py-4 align-top">
                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-semibold text-[#2C2825]">
                                        {
                                          contact.name
                                        }
                                      </p>

                                      <p className="mt-1 truncate text-xs text-[#8B8179]">
                                        {
                                          contact.email
                                        }
                                      </p>
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 align-top">
                                    <p className="break-words text-sm font-medium text-[#625B55]">
                                      {
                                        contact.subject
                                      }
                                    </p>
                                  </td>

                                  <td className="px-4 py-4 align-top">
                                    <div className="min-w-0">
                                      <p className="line-clamp-2 break-words text-xs leading-5 text-[#756D66]">
                                        {
                                          contact.message
                                        }
                                      </p>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          setSelectedContact(
                                            contact,
                                          )
                                        }
                                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C2825] underline underline-offset-4"
                                      >
                                        <FiEye
                                          size={
                                            12
                                          }
                                        />
                                        View full message
                                      </button>
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 align-top">
                                    <p className="whitespace-nowrap text-xs font-medium text-[#625B55]">
                                      {formatDate(
                                        contact.createdAt,
                                      )}
                                    </p>

                                    <p className="mt-1 flex items-center gap-1 text-[10px] text-[#A49B93]">
                                      <FiClock
                                        size={
                                          10
                                        }
                                      />

                                      {formatTime(
                                        contact.createdAt,
                                      )}
                                    </p>
                                  </td>

                                  <td className="px-4 py-4 align-top">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setSelectedContact(
                                            contact,
                                          )
                                        }
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8D1CA] text-[#625B55] transition hover:border-[#2C2825] hover:bg-[#F7F5F2] hover:text-[#2C2825]"
                                        aria-label={`View message from ${contact.name}`}
                                      >
                                        <FiEye
                                          size={
                                            15
                                          }
                                        />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          setContactToDelete(
                                            contact,
                                          )
                                        }
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                                        aria-label={`Delete message from ${contact.name}`}
                                      >
                                        <FiTrash2
                                          size={
                                            15
                                          }
                                        />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* ==================================================
                MOBILE CARDS
                4 CONTACTS PER PAGE
            ================================================== */}

            <div className="p-4 md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={16}
                slidesPerView={1}
                className="contacts-mobile-swiper !pb-12"
              >
                {Array.from({
                  length: Math.ceil(
                    filteredContacts.length / 4,
                  ),
                }).map((_, pageIndex) => {
                  const pageContacts =
                    filteredContacts.slice(
                      pageIndex * 4,
                      pageIndex * 4 + 4,
                    );

                  return (
                    <SwiperSlide
                      key={`mobile-contacts-page-${pageIndex}`}
                    >
                      <div className="divide-y divide-[#EEE9E4] overflow-hidden rounded-xl border border-[#EEE9E4]">
                        {pageContacts.map(
                          (contact) => (
                            <div
                              key={
                                contact._id
                              }
                              className="min-w-0 p-4"
                            >
                              <div className="flex min-w-0 items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F5F2] text-[#625B55]">
                                  <FiMail
                                    size={17}
                                  />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h4 className="truncate text-sm font-semibold text-[#2C2825]">
                                    {
                                      contact.name
                                    }
                                  </h4>

                                  <p className="mt-1 truncate text-xs text-[#8B8179]">
                                    {
                                      contact.email
                                    }
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                  Subject
                                </p>

                                <p className="mt-1 break-words text-sm font-medium text-[#625B55]">
                                  {
                                    contact.subject
                                  }
                                </p>
                              </div>

                              <div className="mt-4">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                  Message
                                </p>

                                <p className="mt-1 line-clamp-3 break-words text-xs leading-5 text-[#756D66]">
                                  {
                                    contact.message
                                  }
                                </p>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedContact(
                                      contact,
                                    )
                                  }
                                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C2825] underline underline-offset-4"
                                >
                                  <FiEye
                                    size={12}
                                  />
                                  View message
                                </button>
                              </div>

                              <div className="mt-4 flex min-w-0 items-center gap-1 text-[10px] text-[#A49B93]">
                                <FiClock
                                  size={11}
                                />

                                <span className="truncate">
                                  {formatDate(
                                    contact.createdAt,
                                  )}{" "}
                                  •{" "}
                                  {formatTime(
                                    contact.createdAt,
                                  )}
                                </span>
                              </div>

                              <div className="mt-4 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedContact(
                                      contact,
                                    )
                                  }
                                  className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-[#D8D1CA] px-3 py-2.5 text-xs font-semibold text-[#625B55] transition hover:bg-[#F7F5F2] hover:text-[#2C2825]"
                                >
                                  <FiEye
                                    size={14}
                                  />
                                  View Message
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setContactToDelete(
                                      contact,
                                    )
                                  }
                                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600"
                                >
                                  <FiTrash2
                                    size={14}
                                  />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </>
        )}
      </div>

      {/* ==================================================
          FULL MESSAGE MODAL
      ================================================== */}

      {selectedContact && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedContact(null);
            }
          }}
        >
          <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#D8D1CA] bg-white shadow-2xl">
            <div className="flex shrink-0 items-start justify-between border-b border-[#D8D1CA] px-5 py-4 sm:px-6">
              <div className="min-w-0 pr-4">
                <p className="text-xs font-medium text-[#8B8179]">
                  Contact Message
                </p>

                <h3 className="mt-1 break-words text-lg font-bold text-[#2C2825]">
                  {
                    selectedContact.subject
                  }
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedContact(null)
                }
                className="shrink-0 rounded-lg p-2 text-[#756D66] transition hover:bg-[#F7F5F2] hover:text-[#2C2825]"
                aria-label="Close message"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="shrink-0 border-b border-[#EEE9E4] bg-[#FCFBFA] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C2825] text-sm font-semibold text-white">
                  {selectedContact.name
                    .trim()
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#2C2825]">
                    {selectedContact.name}
                  </p>

                  <p className="truncate text-xs text-[#8B8179]">
                    {selectedContact.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#625B55]">
                {selectedContact.message}
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#D8D1CA] bg-[#FCFBFA] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-1 text-[10px] text-[#A49B93]">
                <FiClock size={11} />

                <span className="truncate">
                  {formatDate(
                    selectedContact.createdAt,
                  )}{" "}
                  •{" "}
                  {formatTime(
                    selectedContact.createdAt,
                  )}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedContact(null)
                }
                className="shrink-0 rounded-xl bg-[#2C2825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#403A35]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          DELETE CONFIRMATION
      ================================================== */}

      <DeleteConfirmModal
        isOpen={
          contactToDelete !== null
        }
        title="Delete Contact Message"
        itemName={
          contactToDelete
            ? `${contactToDelete.name} — ${contactToDelete.subject}`
            : "this contact message"
        }
        isDeleting={isDeleting}
        onClose={() => {
          if (!isDeleting) {
            setContactToDelete(null);
          }
        }}
        onConfirm={handleDeleteContact}
      />

      <style>{`
        .contacts-swiper .swiper-pagination,
        .contacts-mobile-swiper .swiper-pagination {
          bottom: 0;
        }

        .contacts-swiper .swiper-pagination-bullet,
        .contacts-mobile-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #D8D1CA;
          opacity: 1;
          transition: all 0.2s ease;
        }

        .contacts-swiper .swiper-pagination-bullet-active,
        .contacts-mobile-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 999px;
          background: #2C2825;
        }
      `}</style>
    </div>
  );
};

export default DashboardContacts;