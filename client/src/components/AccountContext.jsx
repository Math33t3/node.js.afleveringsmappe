import { useNavigate } from "react-router-dom";

const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: null });
    const navigate = useNavigate();
    //useEffect runs on mount, og hver gang dependencies(array) skifter value. så hvis der ikke tilføjes noget kører den kun ved mount.
    useEffect(() => {
        fetch("http://localhost:8080/auth/login", {
            credentials: "include"
        }).catch(error => {
            setUser({ loggedIn: false })
            return;
        }).then(response => {
            if (!response || !response.ok || response.status >= 400) {
                setUser({ loggedIn: false });
                return;
            }
            return response.json();
        }).then(data => {
            //console.log(data);
            if (!data) {
                //console.log("not logged in");
                setUser({ loggedIn: false });
                return;
            }
            //console.log("logged in already");
            navigate("/home");
            setUser({ ...data });
        }
        )
    }, [])

    return (
        <AccountContext.Provider value={{ user, setUser }} >
            {children}
        </AccountContext.Provider>
    );
};

export default UserContext;