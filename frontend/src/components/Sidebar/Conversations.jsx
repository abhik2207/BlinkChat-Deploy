import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

function Conversations() {
    const { loading, conversations } = useGetConversations();

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {conversations.map((convo, index) => (
                <Conversation key={convo._id} conversation={convo} emoji={getRandomEmoji()} lastIdx={index === conversations.length - 1} />
            ))}

            {loading ? <span className="loading loading-spinner"></span> : null}
        </div>
    )
}

export default Conversations;
