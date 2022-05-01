import { SITE_TITLE } from '../../constants/constants'

const Footer = () => {
    return (
        <footer className="bg-sky-600 text-white text-center py-4">
            <p className="mb-1">{SITE_TITLE} &copy;</p>
            <p>Desarrollado por Gil</p>
        </footer>
    )
}

export default Footer
