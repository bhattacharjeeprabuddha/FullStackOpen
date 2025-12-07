import { useEffect, useState } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logut";
import blogService from "./services/blogs";
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

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("username", username);
    console.log("password", password);

    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
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
      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      <div>{errorMessage}</div>

      <h2>blogs</h2>
      {user && <p>{`${user.username} logged in`}</p>}
      {user && <Logout user={user} />}
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
