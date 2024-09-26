import { useLogout } from "../lib/useLogout";

function LogoutButton({ className, children }) {
  const { logout } = useLogout();
  return (
    <button onClick={logout} className={className}>
      {children}
    </button>
  );
}

export default LogoutButton;
