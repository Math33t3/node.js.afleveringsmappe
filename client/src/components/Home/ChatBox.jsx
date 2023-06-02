import { Button, HStack, Input } from "@chakra-ui/react";
import { Form, Formik, Field} from "formik";
import * as Yup from "yup";
import { socket } from "../../socket";
import { useContext } from "react";
import { MessagesContext } from "./Home";



const ChatBox = ({userId}) => {
    const { setMessages} = useContext(MessagesContext);
    return (
        <Formik initialValues={{message: ""}} 
        validationSchema={Yup.object({message: Yup.string().min(1).max(255)})} 
        onSubmit={(values, actions) => {
            const message = {to: userId, from: null,  content: values.message}
            setMessages((prevMessages) => [message, ...prevMessages]);
            socket.emit("directMessage", message)
            actions.resetForm();
        }}>
            <HStack as={Form} w={"100%"} pb="1rem" px="1rem">
                <Input as={Field} name="message" placeholder="Type here" autoComplete="off" />
                <Button type="submit">Send</Button>

            </HStack>

        </Formik>
    )
}

export default ChatBox;