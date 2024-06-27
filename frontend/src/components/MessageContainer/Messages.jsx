import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

function Messages() {
    const { loading, messages } = useGetMessages();
    const lastMessageRef = useRef();

    useListenMessages();

    useEffect(()=>{
        setTimeout(()=>{
            lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
        }, 50);
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading && messages.length > 0 && messages.map((msg) => (
                <div key={msg._id} ref={lastMessageRef}>
                    <Message message={msg} />
                </div>
            ))}

            {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className="text-center text-sm text-gray-500 mt-6">Send a message to start the conversation!</p>
            )}
        </div>
    )
}

export default Messages;
