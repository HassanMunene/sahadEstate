import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom";

export const PrivateRoute = (props) => {
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if(!currentUser) {
            props.openSignIn()
        }
    }, [currentUser, props]);

    return currentUser ? <Outlet /> : null;
}