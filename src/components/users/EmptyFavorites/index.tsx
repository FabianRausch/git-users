import { Typography } from '@mui/material'
import Link from 'next/link'
import styles from './EmptyFavorites.module.css'

const EmptyFavorites = () => {
  return (
    <div className={styles.emptyFavorites}>
      <Typography component="p" fontWeight={400}>
        There are no favorite users yet.
      </Typography>
      <Link href='/users' className={styles.link}>See users</Link>
    </div>
  )
}

export default EmptyFavorites
