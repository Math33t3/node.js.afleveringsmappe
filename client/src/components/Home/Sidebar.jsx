import { VStack, HStack, Heading, Button, TabList, Tab, Text, Circle, useDisclosure } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons"
import { useContext } from "react";
import { FriendContext } from "./Home";
import  AddFriend from "./AddFriend";

const Sidebar = () => {
    const { friendsList, setFriendsList } = useContext(FriendContext);
    const { isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            <VStack paddingY={"2rem"}>
                <HStack justify={"space-around"} w={"80%"}>
                    <Heading size={"md"}>Add a Friend</Heading>
                    <Button onClick={onOpen}>
                        <PlusSquareIcon></PlusSquareIcon>
                    </Button>
                </HStack>

                <VStack as={TabList}>
                    {friendsList.map(friend => (
                        <HStack key={`friend:${friend.username}`} as={Tab}>
                            <Circle bg={friend.connected ? "green.300" : "red.300"} h={"25px"} w="25px" />
                            <Text>{friend.username}</Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
            <AddFriend isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Sidebar;