import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { authenticatedUserLinks as links } from './links';

function AuthenticatedUserLinks() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <>
            {links.map((link, index) => (
                <li key={index}>
                    <Link
                        to={link.to}
                        title={link.title}
                        className="nav-link"
                    >
                        <i
                            className={`nav-bar-icon bi ${link.icon}`}
                            aria-hidden="true"
                        />
                    </Link>
                </li>
            ))}
        </>
    );
}

export default AuthenticatedUserLinks;