import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

const LoginPage = () => {
  const authStatus = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setTimeout(() => {
      logout();
    }, 1500);
  }, []);

  if (authStatus === "checking") {
    return <h2>Checking Auth Status...</h2>;
  }

  return (
    <>
      <h2> Login Page</h2>

      {authStatus === "authenticated" ? (
        <div>Autenticado como :{JSON.stringify(user, null, 2)} </div>
      ) : (
        <div>No autenticado</div>
      )}

      {authStatus === "authenticated" ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login("mar@email.com", "123")}>Login</button>
      )}
    </>
  );
};

export default LoginPage;
