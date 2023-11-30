import Link from 'next/link'
//Después de CSS
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar py-5">
            <Link href="/">
                <h1 className="text-3xl font-bold">Clase de Nextjs</h1>
            </Link>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/users">Posts</Link>
                </li>
            </ul>
        </nav>
    )
}