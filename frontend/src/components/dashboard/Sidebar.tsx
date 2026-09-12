import type { ReactNode } from "react";

import {
  FiBookOpen,
  FiHome,
  FiLogOut,
  FiMail,
  FiX,
} from "react-icons/fi";

import type { DashboardPage } from "../../pages/Dashboard";

import Logo from "../../assets/images/lms-logo.webp";

interface SidebarProps {
  activePage: DashboardPage;
  setActivePage: (page: DashboardPage) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  activePage,
  setActivePage,
  isOpen = true,
  onClose,
}: SidebarProps) => {
  const menuItems: {
    id: DashboardPage;
    label: string;
    icon: ReactNode;
  }[] = [
    {
      id: "home",
      label: "Dashboard",
      icon: <FiHome size={19} />,
    },
    {
      id: "courses",
      label: "Courses",
      icon: <FiBookOpen size={19} />,
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: <FiMail size={19} />,
    },
  ];

  const handleNavigation = (page: DashboardPage) => {
    setActivePage(page);
    onClose?.();
  };

  const handleLogout = () => {
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");

    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile overlay only */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            backdrop-blur-[1px]
            lg:hidden
          "
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50

          flex
          h-screen
          w-[260px]
          shrink-0
          flex-col

          overflow-hidden

          border-r
          border-[#D8D1CA]
          bg-white

          shadow-[4px_0_24px_rgba(44,40,37,0.04)]

          transition-transform
          duration-300
          ease-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* ================= HEADER ================= */}
        <div
          className="
            flex
            h-20
            shrink-0
            items-center
            justify-between
            border-b
            border-[#D8D1CA]
            px-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-[#D8D1CA]
                bg-[#F7F5F2]
              "
            >
              <img
                src={Logo}
                alt="LMS"
                className="h-full w-full object-contain p-1.5"
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-bold
                  tracking-tight
                  text-[#2C2825]
                "
              >
                LMS
              </p>

              <p
                className="
                  truncate
                  text-[11px]
                  text-[#8B8179]
                "
              >
                Owner Dashboard
              </p>
            </div>
          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              rounded-lg
              p-2
              text-[#6F6862]
              transition
              hover:bg-[#F7F5F2]
              lg:hidden
            "
          >
            <FiX size={19} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-4
            py-6

            scrollbar-thin
          "
        >
          <p
            className="
              mb-3
              px-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#A29A93]
            "
          >
            Management
          </p>

          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive =
                activePage === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleNavigation(item.id)
                  }
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3.5
                    py-3
                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-[#2C2825] text-white shadow-sm"
                        : "text-[#625B55] hover:bg-[#F7F5F2] hover:text-[#2C2825]"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-colors

                      ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-[#817870] group-hover:text-[#2C2825]"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span className="truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ================= LOGOUT ================= */}
        <div
          className="
            shrink-0
            border-t
            border-[#D8D1CA]
            bg-white
            p-4
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3.5
              py-3
              text-sm
              font-medium
              text-[#625B55]

              transition

              hover:bg-red-50
              hover:text-red-600
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#F7F5F2]
                text-[#817870]

                transition

                group-hover:bg-red-100
                group-hover:text-red-600
              "
            >
              <FiLogOut size={18} />
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;