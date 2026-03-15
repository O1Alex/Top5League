import { memo } from "react";
import { Link } from "react-router-dom";

const HeaderLeft = memo(() => {
  return (

    <div className="header-left">
      <Link to="/">
        <img
          src="/images/logo-grand.png"
          srcSet="petit-logo 768w,
                  grand-logo 1200w"
          sizes="(max-width: 768px) 120px, 250px"
          alt="Top 5 League"
          className="t5l-logo"
        />
      </Link>
    </div>

  );
});

export default HeaderLeft;