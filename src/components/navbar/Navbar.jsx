import Link from "next/link"
import './styles.scss'
import Image from "next/image"
import logo from "../../../public/logo.svg"

const Navbar = ()=> {
    const routes = [
      {label: 'Home',route: '/', className: ''},
      {label: 'About Us', route: '/about', className: ''},
      {label: 'Login', route: '/login', className: 'gold'},
      {label: 'SignUp', route: '/signup', className: ''},

        
    ]
    return (
        <nav className="Navbar">
          <Link href='/' className="Navbar__logo">
            <Image src={logo}></Image>
          </Link>
            <ul className="Navbar__ul">
            {routes.map(({ label, route, className }) => {
              return (
                <li key={route} className="Navbar__ul--li">
                  <Link href={route} className={'Navbar__ul--li-' +className}>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
    )
}

export default Navbar;