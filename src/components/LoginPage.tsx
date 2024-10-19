import { useAuthStore } from "../store/auth.store"


const LoginPage = () => {

    const authStatus = useAuthStore(state => state.status)

  return (
    <div>
      <h2> Login Page</h2>
      {authStatus}
    </div>
  )
}

export default LoginPage
