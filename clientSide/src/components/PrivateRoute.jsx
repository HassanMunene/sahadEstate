import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom";

export const PrivateRoute = (props) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    return (
        currentUser ? <Outlet /> : props.openSignIn()
    )
}