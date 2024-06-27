import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

function useLogin() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        
        try {
            setLoading(true);

            const response = await fetch('/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data);

            localStorage.setItem('blink-chat-user', JSON.stringify(data));
            setAuthUser(data);
        }
        catch (err) {
            toast.error(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, login };
}

export default useLogin;


const handleInputErrors = (username, password) => {
    if (!username || !password) {
        toast.error("Please fill all the fields!");
        return false;
    }
    
    return true;
}