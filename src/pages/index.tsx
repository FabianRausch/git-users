import Head from "next/head";
import styles from "./Home.module.css";
import Link from "next/link";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from '@mui/icons-material/Add';
import { Typography } from "@mui/material";
import { NAVBAR_LINKS } from "@/constants/links";

export default function Home() {

  const handleIconLink = (link: string) => {
    switch (link) {
      case "users":
        return <PeopleAltIcon />;
      case "favorites":
        return <StarIcon />;
      default:
        return <AddIcon />;
    }
  }
  return (
    <>
      <Head>
        <title>UsersApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Typography fontWeight={600} variant="h3" component="h1">
          UsersApp
        </Typography>
        <div className={styles.content}>
          {NAVBAR_LINKS.map((link) => (
            <Link key={link.id} href={link.href} className={styles.navItem}>
              {handleIconLink(link.id)} {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
