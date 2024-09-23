import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

const withAuth = (Component) => {
    return (props) => {
        const { user } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.push("/login");
            }
        }, [user]);

        return user ? <Component {...props} /> : null;
    };
};

export default withAuth;
