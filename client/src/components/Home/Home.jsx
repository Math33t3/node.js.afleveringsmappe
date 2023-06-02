import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { createContext, useState } from "react";
import LogoutButton from "../Logout/Logout";
import Sidebar from "./Sidebar";
import Chats from "./Chats";
import useSocket from "./SocketLogin";

export const FriendContext = createContext();
export const MessagesContext = createContext();

const Home = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [friendIndex, setFriendIndex] = useState(0);
    useSocket(setFriendsList, setMessages);

    return (
        <FriendContext.Provider value={{ friendsList, setFriendsList }}>
            <Grid templateColumns="repeat(10 , 1fr)" h="100vh" as={Tabs} onChange={(index) => setFriendIndex(index)}>
                <GridItem colSpan={"3"} maxH="100vh" borderRight="2px solid black">
                    <Sidebar />
                    <LogoutButton />
                </GridItem>
                <GridItem colSpan={"7"} maxH="100vh">
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                            <Chats userId={friendsList[friendIndex]?.userId} />
                    </MessagesContext.Provider>
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    );
}

export default Home;