import { VStack, ButtonGroup, Button, FormControl, FormLabel, FormErrorMessage, Input, Heading, Text } from '@chakra-ui/react';
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import TextField from '../TextField';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AccountContext } from '../AccountContext';

const Login = () => {
    const { setUser } = useContext(AccountContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    return (<Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
            username: Yup.string().required("Username needed").min(6, "Username too short").max(30, "Username too long"),
            password: Yup.string().required("Password needed").min(6, "Password too short").max(50, "Password too long"),
        })}
        onSubmit={(values, actions) => {
            const vals = { ...values };
            actions.resetForm();
            fetch("http://localhost:8080/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vals)
            }).catch((error) => {
                return;
            })
                .then((res) => {
                    if (!res || !res.ok || res.status >= 400) {
                        return;
                    }
                    return res.json();
                })
                .then(data => {
                    if (!data) return;
                    setUser({ ...data });
                    if (data.status) {
                        setError(data.status)
                    } else if (data.loggedIn) {
                        navigate("/home");
                    } 
                });
        }}
    >
        <VStack
            as={Form}
            w={{ base: "90%", md: "500px" }}
            m="auto"
            justify="center"
            h="100vh"
            spacing="1rem">

            <Heading>Log In</Heading>
            <Text as="p" color="red.700" >
                {error}
            </Text>

            <TextField name="username" placeholder="Enter Username" autoComplete="off" label="Username" />

            <TextField name="password" placeholder="Enter Password" autoComplete="off" type="password" label="Password" />

            <ButtonGroup pt="2rem">
                <Button type='submit' >Log In</Button>
                <Button onClick={() => navigate("/register")} >Create Account</Button>
            </ButtonGroup>
        </VStack>
    </Formik>
    )
};

export default Login;