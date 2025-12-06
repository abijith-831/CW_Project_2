import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const TableSkeleton = () => {
  // access theme mode from redux store
  const themeMode = useSelector((state: any) => state.auth.currentUser?.theme_preference);

  return (
    <Box>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={22}
        animation="wave"
        sx={{
          borderRadius: 1,
          bgcolor:
            themeMode === "dark"
              ? "rgba(255, 255, 255, 0.30)" 
              : "rgba(200, 200, 200, 0.40)", 
        }}
      />
    </Box>
  );
};

export default TableSkeleton;
