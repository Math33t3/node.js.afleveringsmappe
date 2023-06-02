import { useContext, useEffect } from "react"
import { socket } from "../../socket";
import {AccountContext} from "../AccountContext";

const useSocket = (setFriendsList, setMessages) => {
    const { setUser } = useContext(AccountContext);
  
    useEffect(() => {
      socket.connect();
  
      const handleFriends = (friendsList) => {
        setFriendsList(friendsList);
      };
  
      const handleMessages = (messages) => {
        setMessages(messages);
      };
  
      const handleDirectMessage = (message) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
      };
  
      const handleConnected = (status, username) => {
        setFriendsList((oldList) => {
          return oldList.map((friend) => {
            if (friend.username === username) {
              friend.connected = status;
            }
            return friend;
          });
        });
      };
  
      const handleConnectError = () => {
        setUser({ loggedIn: false });
      };
  
      socket.on("friends", handleFriends);
      socket.on("messages", handleMessages);
      socket.on("directMessage", handleDirectMessage);
      socket.on("connected", handleConnected);
      socket.on("connect_error", handleConnectError);
  
      return () => {
        socket.off("friends", handleFriends);
        socket.off("messages", handleMessages);
        socket.off("directMessage", handleDirectMessage);
        socket.off("connected", handleConnected);
        socket.off("connect_error", handleConnectError);
      };
    }, [setUser, setFriendsList, setMessages]);
  };
  
  export default useSocket;