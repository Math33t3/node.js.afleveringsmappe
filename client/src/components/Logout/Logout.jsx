import { Button, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { AccountContext } from "../AccountContext";

const LogoutButton = () => {
  const { setUser } = useContext(AccountContext);

  const handleLogout = () => {
    // Deletes cookie ved at gøre den outdated
    fetch("http://localhost:8080/auth/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });
    setUser({ loggedIn: false });
  };
  return (
    <Box position="fixed" bottom="1rem" left="1rem" zIndex="999">
      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;