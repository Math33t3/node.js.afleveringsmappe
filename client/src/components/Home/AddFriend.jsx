import { Heading, Button } from "@chakra-ui/react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { useContext, useCallback, useState } from "react";
import TextField from "../TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { socket } from "../../socket";
import { setFriendsList ,FriendContext } from "./Home";
/*Chakra ui Modal template => chakra-ui.com/overlay/modal*/

const AddFriend = ({ isOpen, onClose }) => {
    const [error, setError] = useState("");
    const closeModal = useCallback(() => {
        setError("");
        onClose();
    }, [onClose]);
    const {setFriendsList} = useContext(FriendContext);
    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Friend</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{ friendName: "" }}
                    validationSchema={Yup.object({
                        friendName: Yup.string().required("Username needed").min(6, "Invalid Username").max(30, "Invalid Username"),
                    })}
                    onSubmit={(values) => {
                        socket.emit(
                            "addFriend", values.friendName,
                            ({ errorMessage, done, newFriend }) => {
                                if (done) {
                                    setFriendsList(oldList => [newFriend, ...oldList ]);
                                    closeModal();
                                    return;
                                }
                                setError(errorMessage);
                            }
                        );
                    }}>
                    <Form>
                        <ModalBody>
                            <Heading as="p" textAlign={"center"} color={"red.300"}>
                                {error}
                            </Heading>
                            <TextField
                                name="friendName" label="Name" placeholder="friend's username" autoComplete="off" >

                            </TextField>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type="submit">
                                Submit
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default AddFriend;