import { useSelector } from "react-redux";

import Navigation from "../UI/RootComponents/Navigation";
import Notification from "../UI/RootComponents/Notification";
import Footer from "../UI/RootComponents/Footer";

import { Outlet } from "react-router-dom";

function Root() {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <>
      <Navigation />
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;
