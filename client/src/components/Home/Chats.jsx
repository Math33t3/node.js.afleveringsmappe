import { Text, TabPanels, TabPanel, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { MessagesContext, FriendContext } from "./Home";


const Chats = () => {
    const { friendsList } = useContext(FriendContext);
    const { messages } = useContext(MessagesContext);

    return friendsList.length > 0 ? (
        <VStack justify="end" h="100%">
            <TabPanels overflowY="scroll">
                {friendsList.map(friend => {
                    <VStack as={TabPanel} key={`chat:${friend.username}`} width={"100%"} flexDir={"column-reverse"}>
                           {messages.filter(message => message.to === friend.userId || message.from === friend.userId)
                           .map((filteredMessage, index ) => (
                                <Text key={`message:${friend.username}.${index}`}>
                                    {filteredMessage.content}
                                </Text>

                           ))}
                    </VStack>
                })}
            </TabPanels>
        </VStack>
    ) : (
        <VStack textAlign={"center"}>
            <TabPanels>
                <TabPanel>
                    <Text>You've got no friends</Text>
                    <Text>Nobody likes you </Text>
                </TabPanel>
            </TabPanels>
        </VStack>
    );
}

export default Chats;