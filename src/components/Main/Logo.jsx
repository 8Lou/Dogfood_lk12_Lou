import { Link } from "react-router-dom";

import logoImg from "../../assents/images/logo.svg";

const Logo = () => (
  <Link className="logo" to="/catalog">
        <img src={logoImg} alt="D0gf00D" />
    <span className="logo__text">D0gF00D</span>
  </Link>
);

export default Logo;
