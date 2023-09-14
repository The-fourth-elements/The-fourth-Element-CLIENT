import Link from "next/link"
import './styles.scss'

const Navbar = ()=> {
    const routes = [
        {label: 'Home',route: '/', className: ''},
        {label: 'Login', route: '/login', className: 'gold'},
        {label: 'SignUp', route: '/signup', className: ''}

        
    ]
    return (
        <nav className="Navbar">
          <Link href='/'>
            {/* logo */}
            home
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
          <ul>
            <li>holi</li>
            <li>holi</li>
          </ul>
          
        </nav>
    )
}

export default Navbar;