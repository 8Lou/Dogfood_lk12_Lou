import { Link } from "react-router-dom"

import Logo from "./Logo";
const links = [
    { name: "Каталог", src: "/" },
    { name: "Избранное", src: "/" },
    { name: "Корзина", src: "/" }
]

const Footer = () => <footer>
    <div className="footer__copy">
        <Logo />
        <span className="getFullYear">© {new Date().getFullYear()}</span>
    </div>
    <ul className="footer__nav">
        {links.map(el => <li key={el.name}>
            <Link to={el.src}>{el.name}</Link>
        </li>)}
    </ul>
</footer>

export default Footer;