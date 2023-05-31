import { Routes, Route } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import PrivateRoutes from "./privateRoutes";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import Home from "./Home/Home";

const Views = () => {
    const {user} = useContext(AccountContext);
    return user.loggedIn === null ? (
    <Text>Loading... please hold on</Text> ) : (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home/>} />
        </Route>
        <Route path="/*" element={<Login />} />
    </Routes>
    );
};

export default Views;