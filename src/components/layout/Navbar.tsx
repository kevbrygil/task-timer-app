import Link from 'next/link'
import { SITE_TITLE } from '../../constants/constants'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Navbar = () => {
    const { username, setUsername } = useContext(UserContext)

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        setUsername('')
    }

    return (
        <header className="flex justify-between items-center bg-sky-600 text-white py-4 px-4">
            <h2 className="text-lg">
                <Link href="/">
                    <a>{SITE_TITLE}</a>
                </Link>
            </h2>
            <nav>
                <ul className="flex items-center">
                    {username ? (
                        <>
                            <NavLink href="/">Inicio</NavLink>
                            <NavLink href="/stats">Estadísticas</NavLink>
                            <button
                                onClick={handleLogout}
                                className="border py-1 px-3 ml-8 rounded hover:bg-sky-700"
                                type="button"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink href="/login">Iniciar sesión</NavLink>
                            <NavLink href="/signup">Registrarse</NavLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

interface NavLinkProps {
    href: string
    children: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    return (
        <li className="ml-8">
            <Link href={href}>
                <a>{children}</a>
            </Link>
        </li>
    )
}

export default Navbar
