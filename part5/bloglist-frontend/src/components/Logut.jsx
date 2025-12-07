const handleLogout = () => {
  window.localStorage.removeItem("loggedInUser");
};

const Logout = ({ user }) => {
  return (
    <div>
      <p>
        {user.username} logged in <button onClick={handleLogout}>Logut</button>
      </p>
    </div>
  );
};

export default Logout;
