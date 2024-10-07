import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from '../../styles/Header.module.css';
import LoginManager from "../customer/LoginManager";
import {useRouter} from "next/router";

export default function Navigation() {
    const params = usePathname();
    const router = useRouter();
    
    const links = [
        { href: "", label: "카테고리 1" },
        { href: "#", label: "카테고리 2" },
        { href: "#", label: "카테고리 3" }, 
        { href: "#", label: "카테고리 4" },
        { href: "/mypage", label: "마이페이지" },
    ];

    const handleLogoClick = () => {
        // 메인 페이지로 이동
        window.location.href = "/";
    };

    function loginHandler() {
        router.push("/customer/login").then(r => {});
    }

    function goCartHandler() {
        router.push("/cart").then(r => {});
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={handleLogoClick}>
                <img
                    className="w-32 cursor-pointer" 
                    src="/common/header/logo.png"
                    alt="Logo"
                />
            </div>
            <nav className={styles.nav}>
                <ul className="flex space-x-4">
                    {links.map((link) => (
                        <li key={link.href} className="hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1">
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.authButtons}>
                <button className={styles.signIn} onClick={goCartHandler}>장바구니</button>
                <LoginManager/>
                <button className={styles.signIn} onClick={loginHandler}>Sign in</button>
                <button className={styles.register}>Register</button>
            </div>
        </header>
    );
}
