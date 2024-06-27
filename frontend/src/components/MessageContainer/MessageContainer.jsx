import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TbMessages } from "react-icons/tb";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {

        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className="md:min-w-[500px] md:max-w-[900px] flex flex-col">
            {!selectedConversation ? <NoChatSelected /> :
                <>
                    <div className="bg-blue-600 px-4 py-2 mb-2">
                        <span className="label-text text-gray-200">To:</span>
                        {" "}
                        <span className="text-white font-bold">{selectedConversation.fullName}</span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            }
        </div>
    )
}

export default MessageContainer;


function NoChatSelected() {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center font-semibold text-gray-200 sm:text-lg md:text-xl flex flex-col items-center gap-2">
                <p>Welcome 👋🏻 {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
                <TbMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    );
}
