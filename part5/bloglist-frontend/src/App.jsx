import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("username", username);
    console.log("password", password);

    try {
      const user = await loginService.login(username, password);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
      <div>{errorMessage}</div>

      <h2>blogs</h2>

      {user &&
        blogs.map((blog) => <Blog key={blog.id} blog={blog} user={user} />)}
    </div>
  );
};

export default App;
