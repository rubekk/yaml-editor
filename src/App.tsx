import LoginForm from "./components/Login";
import YamlEditor from "./components/YamlEditor";
import { useAuth } from "./lib/AuthContext";

const Index = () => {
  const { isLoggedIn, login } = useAuth()

  const token = localStorage.getItem("accessToken")
  if (token) login();

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ?
        <YamlEditor />
        :
        <LoginForm />
      }
    </div>
  );
};

export default Index;