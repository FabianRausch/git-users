import { Card, CardContent, CardHeader, Divider, Skeleton } from '@mui/material'
import styles from './DetailsSkeleton.module.css'

const DetailsSkeleton = () => {
  return (
    <div className={styles.userDetail}>
    <Card sx={{ width: '100%', maxWidth: 345 }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        action={<Skeleton variant="circular" width={35} height={35} sx={{marginLeft: '16px'}}/>}
        title={
          <>
            <Skeleton variant="rectangular" sx={{marginBottom: '4px'}} width={'100%'} height={20} />
            <Skeleton variant="rectangular" sx={{marginBottom: '4px'}} width={120} height={14} />
          </>
        }
        subheader={<Skeleton variant="rectangular" width={'100%'} height={12} />}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Divider sx={{marginBottom: '8px'}}/>
        <div className={styles.dataCardContainer}>
          <Skeleton variant="rectangular" width={60} height={40} />
          <Skeleton variant="rectangular" width={60} height={40} />
          <Skeleton variant="rectangular" width={80} height={40} />
        </div>
        <div className={styles.dataDescription}>
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        </div>
        <div className={styles.dataDescription}>
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        </div>
        <div className={styles.dataDescription}>
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        </div>
        <div className={styles.dataDescription}>
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        </div>
        <Divider sx={{ margin: "16px" }} />
        <Skeleton variant="rectangular" width={"100%"} height={12} />
      </CardContent>
    </Card>
  </div>
  )
}

export default DetailsSkeleton
