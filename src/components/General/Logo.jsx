import logoImg from "../../assents/images/logo.png";

const Logo = () => <a className="logo" href="/">
    {/* <span className="logo__pic"></span> */}
    <img src={logoImg} alt="B00tS" />
    <span className="logo__text">B00tS</span>
</a>

export default Logo;