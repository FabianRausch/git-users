import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { NAVBAR_LINKS } from "@/constants/links";

const Navbar = () => {

  const pathname = usePathname()
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.homeItem}>
        <HomeIcon />
        Home
      </Link>
      <div className={styles.items}>

        { NAVBAR_LINKS.map((link) => (
          <Link key={link.id} href={link.href} className={`${styles.navItem} ${pathname === link.href ? styles.active : ""}`}>
            {link.label}
          </Link>
        ))}
     
      </div>
    </div>
  );
};

export default Navbar;
