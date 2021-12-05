import './style.scss';
import PageLogo from '../../images/logo.png'
import { useLocation } from 'react-router';

export function Header() {
    const { pathname } = useLocation();
    return (
        <div className="container">
            <div className="header_content">
                <div className="logo_area">
                    <h1>Devs Page</h1>
                    <img src={PageLogo} alt="" />
                </div>
                <div className="menu_link">
                    <a className={pathname === '/' ? 'menu_active' : 'menu'} href="/">Home</a>
                    <a className={pathname === '/posts' ? 'menu_active' : 'menu'} href="/posts">Posts</a>

                    <div className="do_login">
                        <a href="/login">Faça seu login</a>
                    </div>
                </div>
                
            </div>
        </div>
    )
}