const Logout = ({ user, handleLogout }) => {
  return (
    <div>
      <p>
        {user.username} logged in <button onClick={handleLogout}>Logut</button>
      </p>
    </div>
  );
};

export default Logout;
