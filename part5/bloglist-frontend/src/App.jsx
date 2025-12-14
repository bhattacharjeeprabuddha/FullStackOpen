import { useEffect, useState } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logut";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggleable from "../src/components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  // new blog
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");

  // toggleable state
  const [visible, setVisible] = useState(false);

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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
  };

  return (
    <>
      {errorMessage && (
        <div
          style={{
            color: "red",
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid red",
          }}
        >
          {errorMessage}
        </div>
      )}

      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      {user && <h2>blogs</h2>}
      {notification && (
        <div
          style={{
            color: "green",
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid green",
          }}
        >
          {notification}
        </div>
      )}
      {user && <p>{`${user.username} logged in`}</p>}
      {user && <Logout user={user} handleLogout={handleLogout} />}
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}

      {user && (
        <Toggleable
          buttonLabel="create"
          visible={visible}
          setVisible={setVisible}
        >
          <CreateBlogForm
            blogService={blogService}
            setNotification={setNotification}
            blogs={blogs}
            setBlogs={setBlogs}
            visible={visible}
            setVisible={setVisible}
          />
        </Toggleable>
      )}
    </>
  );
};

export default App;
