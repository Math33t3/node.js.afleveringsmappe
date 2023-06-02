import { Text, TabPanels, TabPanel, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { MessagesContext, FriendContext } from "./Home";
import ChatBox from "./ChatBox";

const Chats = ({ userId }) => {
  const { friendsList } = useContext(FriendContext);
  const { messages } = useContext(MessagesContext);
  const renderFromBottom = useRef(null);

  useEffect(() => {
    renderFromBottom.current?.scrollIntoView();
  }, [messages]);

  return friendsList.length > 0 ? (
    <VStack justify="end" h="100%">
      <TabPanels overflowY="scroll">
        {friendsList.map((friend) => (
          <TabPanel key={`chat:${friend.username}`}>
            <VStack width="100%" flexDir="column-reverse">
              <div ref={renderFromBottom} />
              {messages
                .filter(
                  (msg) =>
                    msg.to === friend.userId || msg.from === friend.userId
                )
                .map((message, index) => (
                  <Text
                    key={`message:${friend.username}.${index}`}
                    m={
                      message.to === friend.userId
                        ? "1rem 0 0 auto !important"
                        : "1rem auto 0 0 !important"
                    }
                    maxW="50%"
                    bg={message.to === friend.userId ? "green.200" : "gray.100"}
                    color="gray.900"
                    borderRadius="5px"
                    p={"0.5rem 1rem"}
                  >
                    {message.content}
                  </Text>
                ))}
            </VStack>
          </TabPanel>
        ))}
      </TabPanels>
      <ChatBox userId={userId} />
    </VStack>
  ) : (
    <VStack textAlign="center">
      <TabPanels>
        <TabPanel>
          <Text>You've got no friends</Text>
          <Text>Nobody likes you </Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chats;