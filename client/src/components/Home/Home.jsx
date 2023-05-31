import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { createContext, useState } from "react";
import Sidebar from "./Sidebar";
import Chats from "./Chats";
import useSocket from "./SocketLogin";

export const FriendContext = createContext();
export const MessagesContext = createContext();

const Home = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [messages, setMessages] = useState([]);

    useSocket(setFriendsList, setMessages);
    console.log(friendsList);
    return (
        <FriendContext.Provider value={{ friendsList, setFriendsList }}>
            <Grid templateColumns="repeat(10 , 1fr)" h="100vh" as={Tabs}>
                <GridItem colSpan={"3"} borderRight="2px solid black">
                    <Sidebar />
                </GridItem>
                <GridItem colSpan={"7"}>
                    <MessagesContext.Provider value= {{messages, setMessages}}>
                        <Chats />
                    </MessagesContext.Provider>
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    );
}

export default Home;