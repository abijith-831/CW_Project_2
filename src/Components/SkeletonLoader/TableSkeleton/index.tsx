import React from 'react'
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const TableSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" width="100%" height={22} animation="wave" sx={{ bgcolor: "rgba(200, 200, 200, 0.40)", borderRadius: 1 }}/>
    </Box>
  )
}

export default TableSkeleton
