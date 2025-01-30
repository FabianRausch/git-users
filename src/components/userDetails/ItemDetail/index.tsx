import { Typography } from "@mui/material";
import styles from "./ItemDetail.module.css";

interface Props {
  label: string;
  value: string;
}

const ItemDetail = ({ label, value }: Props) => {
  return (
    <div className={styles.itemDetail}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {label}:
      </Typography>
      <Typography
        fontWeight={600}
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        {value}
      </Typography>
    </div>
  );
};

export default ItemDetail;
