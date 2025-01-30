import { Typography } from "@mui/material"

import styles from "./DataCard.module.css"

interface Props {
    label: string;
    value: string | number;
    }

const DataCard = ({label, value}: Props) => {
  return (
    <div className={styles.dataCard}>
    <Typography fontWeight={600}>{value} </Typography>
    <Typography fontSize={"12px"}>{label}</Typography>
  </div>
  )
}

export default DataCard
