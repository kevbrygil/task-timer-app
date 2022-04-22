import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex flex-col grow">{children}</main>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default Layout
