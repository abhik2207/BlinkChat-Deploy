import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

function SearchInput() {
    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!search) return;
        
        if(search.length < 3) {
            return toast.error('Search term must be at least 3 characters!');
        }

        const convo = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

        if(convo) {
            setSelectedConversation(convo);
            setSearch('');
        }
        else {
            toast.error('No such user found!');
        }
    }

    return (
        <form className="flex items-center justify-between gap-2" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." className="input input-bordered rounded-full w-full"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="btn btn-circle bg-blue-600 text-white">
                <IoSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}

export default SearchInput;
