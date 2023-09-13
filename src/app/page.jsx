import Link from "next/link"

export default function Home() {
  const routes = [
    { label: 'Home', route: '/' },
    { label: 'Dashboard', route: '/dashboard' },
  ]

  return (
    <>
      <header>
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
      </header>
      <h1>HOlid</h1>
    </>
  )
}
