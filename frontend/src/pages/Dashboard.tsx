import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DashboardHome from "../components/dashboard/DashboardHome";
import DashboardCourses from "../components/dashboard/courses/DashboardCourses";
import DashboardContacts from "../components/dashboard/DashboardContacts";

export type DashboardPage =
  | "home"
  | "courses"
  | "contacts";

const Dashboard = () => {
  const [activePage, setActivePage] =
    useState<DashboardPage>("home");

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const renderContent = () => {
    switch (activePage) {
      case "courses":
        return <DashboardCourses />;

      case "contacts":
        return <DashboardContacts />;

      case "home":
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div
      className="
        min-h-screen
        min-w-0
        overflow-x-hidden
        bg-[#F7F5F2]
      "
    >
      {/* 
        Sidebar is FIXED.
        It does not participate in document layout.
      */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      {/*
        This is the content area.

        IMPORTANT:
        lg:ml-[260px] reserves exactly the sidebar width.

        Therefore:
        Sidebar = fixed 260px
        Content = remaining viewport width
      */}
      <div
        className="
          min-h-screen
          min-w-0
          lg:ml-[260px]
        "
      >
        {/* Topbar is NOT fixed */}
        <Topbar
          activePage={activePage}
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
        />

        <main
          className="
            min-w-0
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;