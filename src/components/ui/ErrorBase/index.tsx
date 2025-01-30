import { Typography } from "@mui/material";
import styles from "./Error.module.css";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  labelLink: string;
  href: string;
}

export default function ErrorBase({
  title,
  description,
  labelLink,
  href,
}: Props) {
  return (
    <div className={styles.container}>
      <Typography variant="h4" component="h3" fontWeight={600}>
        {title}
      </Typography>
      <Typography fontWeight={400}>{description}</Typography>
      <Link className={styles.link} href={href}>
        {labelLink}
      </Link>
    </div>
  );
}
