import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
    const { loading, logout } = useLogout();

    return (
        <div className="mt-auto">
            <div className="divider my-0 py-0 h-1"></div>
            {!loading ? (
                <TbLogout2 className="w-6 h-6 text-white cursor-pointer mt-2" onClick={logout} />
            ) : (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    )
}

export default LogoutButton;
