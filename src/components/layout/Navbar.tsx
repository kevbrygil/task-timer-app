import Link from 'next/link'
import { SITE_TITLE } from '../../constants/constants'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { TasksContext } from '../../contexts/TasksContext'
import type { NavbarLink } from '../../interfaces/NavbarLink'
import { MenuIcon } from '@heroicons/react/solid'

const NavLink: React.FC<NavbarLink> = ({ href, children }) => {
    return (
        <li className="nav-item">
            <Link href={href}>
                <a className="px-3 py-2 flex items-center leading-snug text-white hover:opacity-75">
                    <span>{children}</span>
                </a>
            </Link>
        </li>
    )
}

const Navbar: React.FC = () => {
    const { username, setUsername } = useContext(UserContext)
    const { setTasks } = useContext(TasksContext)
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleLogout = (): void => {
        localStorage.removeItem('access_token')
        setUsername('')
        setTasks([])
    }

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-600 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a className="leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white" href="/">
                            {SITE_TITLE}
                        </a>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3
                            py-1 border border-solid border-transparent rounded bg-transparent
                            block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}>
                            <MenuIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div
                        className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
                        id="example-navbar-danger">
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {username ? (
                                <>
                                    <NavLink href="/">Inicio</NavLink>
                                    <NavLink href="/stats">Estadísticas</NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="border py-1 px-3 ml-3 rounded hover:bg-sky-700 text-white"
                                        type="button">
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
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
