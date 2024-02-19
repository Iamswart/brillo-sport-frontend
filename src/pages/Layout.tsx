import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import MobileFooter from "../components/MobileFooter";

const Layout = () => {
  const location = useLocation();

  const pathsWithoutFooter = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/register",
  ];

  const shouldHideFooter = pathsWithoutFooter.includes(location.pathname);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Box minH="100vh">
        <Outlet />
      </Box>
      {!shouldHideFooter && (
        <>
          {isMobile ? <MobileFooter /> : <Footer />} 
        </>
      )}
    </>
  );
};

export default Layout;
