import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { API_URL } from "../pages/result";

export function logout(props) {
    function handleLogout() {
        axios
            .get(`${API_URL}/user/logout`, {
                headers: { authorization: `Bearer ${props.bearerToken}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                toast.error(`${err.response.data.data.message} `, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(err);
            });
    }

    const Logout = () => {
        props.setBearerToken("");
        handleLogout();

        Router.push("/");
    };
    return Logout;
}
