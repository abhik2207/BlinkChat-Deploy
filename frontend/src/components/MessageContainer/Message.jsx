import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import formatMongoDBDateToIST from "../../utils/extractTime";

function Message({ message }) {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    const senderIsMe = message.senderId === authUser._id;
    const chatClassName = senderIsMe ? 'chat-end' : 'chat-start';
    const profilePic = senderIsMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bubbleBGColor = senderIsMe ? 'bg-blue-600' : '';
    const shouldShake = message.shouldShake ? 'shake' : '';

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="Chat Avatar" />
                </div>
            </div>

            <div className={`chat-bubble text-white ${bubbleBGColor} ${shouldShake}`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formatMongoDBDateToIST(message.createdAt)}</div>
        </div>
    )
}

export default Message;
