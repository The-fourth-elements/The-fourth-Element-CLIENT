import Link from "next/link"

const Navbar = ()=> {
    const routes = [
        {label: 'Home',route: '/'},
        {label: 'Login', route: '/login'}
        
    ]
    return (
        <nav>
            <ul>
            {routes.map(({ label, route }) => {
              return (
                <li key={route}>
                  <Link href={route}>
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