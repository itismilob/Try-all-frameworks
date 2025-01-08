import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);

  const logoutHandler = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (!userJson) {
      console.log("no user");
      setIsUser(false);
      navigate("/react/not-auth");
    }
  });

  return (
    <div className="framework-border react-border">
      <main>
        {isUser && (
          <header>
            <Link to="/react">React home</Link>
            <button onClick={logoutHandler}>Logout</button>
          </header>
        )}
        <Outlet />
      </main>
      <div className="framework-title">
        React JS
        <img className="framework-icon" src="/public/react.svg" />
      </div>
    </div>
  );
}
