import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeaderLeft = memo(() => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="header-left">
      <Link to="/" className="navbar-brand">
        <img
          src={isMobile ? "petit-logo.png" : "grand-logo.png"}
          alt="Top5League"
          className="logo"
        />
      </Link>
    </div>
  );
});

export default HeaderLeft;