import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function useLogout() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            const data = response.json();

            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data);

            localStorage.removeItem('blink-chat-user');
            setAuthUser(null);
        }
        catch (err) {
            toast.error(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, logout };
}

export default useLogout;
