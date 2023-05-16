import { Link } from "react-router-dom";

import logoImg from "../../assents/images/logo.png";

const Logo = () => (
  <Link className="logo" to="/catalog">
    <img src={logoImg} alt="B00tS" />
    <span className="logo__text">B00tS</span>
  </Link>
);

export default Logo;
