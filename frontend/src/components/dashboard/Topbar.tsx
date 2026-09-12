import { useEffect, useState } from "react";
import {
  FiBell,
  FiClock,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

import type { DashboardPage } from "../../pages/Dashboard";

interface TopbarProps {
  activePage: DashboardPage;
  onMenuClick?: () => void;
}

interface StoredUser {
  name?: string;
  email?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "course" | "contact" | "system";
  createdAt: string;
  read: boolean;
}

const NOTIFICATIONS_KEY = "lms_notifications";

const Topbar = ({
  activePage,
  onMenuClick,
}: TopbarProps) => {
  const [
    isNotificationsOpen,
    setIsNotificationsOpen,
  ] = useState(false);

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const pageTitles: Record<
    DashboardPage,
    {
      title: string;
      description: string;
    }
  > = {
    home: {
      title: "Dashboard",
      description: "Overview of your LMS platform",
    },

    courses: {
      title: "Courses",
      description: "Create and manage your courses",
    },

    contacts: {
      title: "Contacts",
      description: "Manage contact messages",
    },
  };

  const user = (() => {
    const storedUser =
      localStorage.getItem("lms_user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(
        storedUser,
      ) as StoredUser;
    } catch {
      return null;
    }
  })();

  const currentPage =
    pageTitles[activePage];

  const userInitial =
    user?.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "O";

  /*
   * =========================
   * LOAD NOTIFICATIONS
   * =========================
   */
  useEffect(() => {
    const loadNotifications = () => {
      const stored =
        localStorage.getItem(
          NOTIFICATIONS_KEY,
        );

      if (!stored) {
        setNotifications([]);
        return;
      }

      try {
        const parsed =
          JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setNotifications(parsed);
        } else {
          setNotifications([]);
        }
      } catch {
        setNotifications([]);
      }
    };

    loadNotifications();

    const handleNotificationsUpdated =
      () => {
        loadNotifications();
      };

    window.addEventListener(
      "lms-notifications-updated",
      handleNotificationsUpdated,
    );

    return () => {
      window.removeEventListener(
        "lms-notifications-updated",
        handleNotificationsUpdated,
      );
    };
  }, []);

  /*
   * =========================
   * SAVE NOTIFICATIONS
   * =========================
   */
  const saveNotifications = (
    updatedNotifications: Notification[],
  ) => {
    localStorage.setItem(
      NOTIFICATIONS_KEY,
      JSON.stringify(
        updatedNotifications,
      ),
    );

    setNotifications(
      updatedNotifications,
    );

    window.dispatchEvent(
      new Event(
        "lms-notifications-updated",
      ),
    );
  };

  /*
   * =========================
   * MARK ONE AS READ
   * =========================
   */
  const markAsRead = (
    notificationId: string,
  ) => {
    const updated =
      notifications.map(
        (notification) =>
          notification.id ===
          notificationId
            ? {
                ...notification,
                read: true,
              }
            : notification,
      );

    saveNotifications(updated);
  };

  /*
   * =========================
   * MARK ALL AS READ
   * =========================
   */
  const markAllAsRead = () => {
    const updated =
      notifications.map(
        (notification) => ({
          ...notification,
          read: true,
        }),
      );

    saveNotifications(updated);
  };

  /*
   * =========================
   * UNREAD COUNT
   * =========================
   */
  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read,
    ).length;

  /*
   * =========================
   * FORMAT TIME
   * =========================
   */
  const formatTime = (
    dateString: string,
  ) => {
    const date =
      new Date(dateString);

    const now = new Date();

    const difference =
      now.getTime() -
      date.getTime();

    const seconds = Math.floor(
      difference / 1000,
    );

    const minutes = Math.floor(
      seconds / 60,
    );

    const hours = Math.floor(
      minutes / 60,
    );

    const days = Math.floor(
      hours / 24,
    );

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days < 7) {
      return `${days}d ago`;
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

  /*
   * =========================
   * NOTIFICATION ICON
   * =========================
   */
  const getNotificationIcon = (
    type: Notification["type"],
  ) => {
    if (type === "contact") {
      return <FiMail size={16} />;
    }

    if (type === "course") {
      return <FiBell size={16} />;
    }

    return <FiBell size={16} />;
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-[#D8D1CA] bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* =========================
          LEFT
      ========================= */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-xl p-2.5 text-[#625B55] transition hover:bg-[#F7F5F2] hover:text-[#2C2825] lg:hidden"
        >
          <FiMenu size={21} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight text-[#2C2825] sm:text-xl">
            {currentPage.title}
          </h1>

          <p className="hidden truncate text-xs text-[#8B8179] sm:block">
            {currentPage.description}
          </p>
        </div>
      </div>

      {/* =========================
          RIGHT
      ========================= */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* =========================
            NOTIFICATIONS
        ========================= */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={
              isNotificationsOpen
            }
            onClick={() =>
              setIsNotificationsOpen(
                (previous) =>
                  !previous,
              )
            }
            className="relative rounded-xl p-2.5 text-[#625B55] transition hover:bg-[#F7F5F2] hover:text-[#2C2825]"
          >
            <FiBell size={19} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#2C2825] px-1 text-[9px] font-bold text-white">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </button>

          {/* =========================
              NOTIFICATION POPUP
          ========================= */}
          {isNotificationsOpen && (
            <div
              className="
                fixed
                left-3
                right-3
                top-[88px]
                z-50
                flex
                max-h-[calc(100vh-104px)]
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-[#D8D1CA]
                bg-white
                shadow-xl

                sm:absolute
                sm:left-auto
                sm:right-0
                sm:top-14
                sm:w-[380px]
                sm:max-w-[calc(100vw-2rem)]
                sm:max-h-[500px]
              "
            >
              {/* =========================
                  HEADER
              ========================= */}
              <div className="flex shrink-0 items-center justify-between border-b border-[#D8D1CA] px-4 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-[#2C2825]">
                    Notifications
                  </h2>

                  <p className="mt-1 text-xs text-[#8B8179]">
                    {notifications.length ===
                    0
                      ? "No notifications yet"
                      : unreadCount > 0
                        ? `${unreadCount} unread notification${
                            unreadCount ===
                            1
                              ? ""
                              : "s"
                          }`
                        : "All notifications read"}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() =>
                    setIsNotificationsOpen(
                      false,
                    )
                  }
                  className="rounded-lg p-2 text-[#8B8179] transition hover:bg-[#F7F5F2] hover:text-[#2C2825]"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* =========================
                  MARK ALL AS READ
              ========================= */}
              {notifications.length >
                0 &&
                unreadCount > 0 && (
                  <div className="flex shrink-0 justify-end border-b border-[#EEEAE6] px-4 py-2.5">
                    <button
                      type="button"
                      onClick={
                        markAllAsRead
                      }
                      className="text-[11px] font-medium text-[#625B55] transition hover:text-[#2C2825]"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}

              {/* =========================
                  NOTIFICATIONS LIST
              ========================= */}
              <div className="min-h-0 flex-1 overflow-y-auto">
                {notifications.length ===
                0 ? (
                  <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5F2] text-[#8B8179]">
                      <FiBell
                        size={21}
                      />
                    </div>

                    <p className="text-sm font-medium text-[#2C2825]">
                      No notifications
                    </p>

                    <p className="mt-1 max-w-[250px] text-xs leading-5 text-[#8B8179]">
                      New course activity,
                      contact messages,
                      and system updates
                      will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map(
                    (
                      notification,
                    ) => (
                      <div
                        key={
                          notification.id
                        }
                        className={`flex gap-3 border-b border-[#EEEAE6] px-4 py-4 transition hover:bg-[#F7F5F2] ${
                          !notification.read
                            ? "bg-[#FCFBFA]"
                            : ""
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                            !notification.read
                              ? "bg-[#2C2825] text-white"
                              : "bg-[#F7F5F2] text-[#625B55]"
                          }`}
                        >
                          {getNotificationIcon(
                            notification.type,
                          )}
                        </div>

                        {/* Content */}
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(
                              notification.id,
                            )
                          }
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex items-start gap-2">
                            <p
                              className={`min-w-0 flex-1 break-words text-sm text-[#2C2825] ${
                                !notification.read
                                  ? "font-semibold"
                                  : "font-medium"
                              }`}
                            >
                              {
                                notification.title
                              }
                            </p>

                            {!notification.read && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2C2825]" />
                            )}
                          </div>

                          <p className="mt-1 break-words text-xs leading-5 text-[#8B8179]">
                            {
                              notification.message
                            }
                          </p>

                          <div className="mt-2 flex items-center gap-1 text-[10px] text-[#A49B93]">
                            <FiClock
                              size={11}
                            />

                            <span>
                              {formatTime(
                                notification.createdAt,
                              )}
                            </span>
                          </div>
                        </button>
                      </div>
                    ),
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-[#D8D1CA] sm:block" />

        {/* =========================
            USER
        ========================= */}
        <div className="flex items-center gap-2.5">
          <div className="hidden max-w-[180px] text-right sm:block">
            <p className="truncate text-sm font-semibold text-[#2C2825]">
              {user?.name || "Owner"}
            </p>

            <p className="truncate text-[11px] text-[#8B8179]">
              {user?.email ||
                "Administrator"}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C2825] text-sm font-semibold text-white shadow-sm">
            {userInitial}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;