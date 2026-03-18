import { memo } from "react";
import { Link } from "react-router-dom";

const HeaderLeft = memo(() => {
  return (

    <div className="header-left">
       <Link to="/" className="navbar-brand ">
            <img src="grand-logo.png" alt="Top5League" width={275}/>
        </Link>
    </div>

  );
});

export default HeaderLeft;