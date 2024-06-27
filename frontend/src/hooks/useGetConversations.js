import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversations() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                setLoading(true);

                const response = await fetch('/api/users');
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }
                console.log(data);
                setConversations(data);
            }
            catch (err) {
                toast.error(err.message);
            }
            finally {
                setLoading(false);
            }
        }
        getConversations();
    }, []);

    return { loading, conversations };
}

export default useGetConversations;
