import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useState } from "react";

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();

    const sendMessage = async (message) => {
        try {
            setLoading(true);

            const response = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data);

            setMessages([...messages, data]);
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, sendMessage };
}

export default useSendMessage;
