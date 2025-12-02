import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonLoaderGraph = () => {
  return (
    <Box sx={{ width: "100%", height: 330, p: 2, position: "relative" }}>
      <Skeleton variant="rectangular" width="100%" height={300} animation="wave" sx={{ bgcolor: "rgba(200, 200, 200, 0.40)", borderRadius: 1 }}/>
      <Box sx={{position:'absolute' , display:'flex',top:20 , left:20,right:20,justifyContent:"space-between",px:2}}>
            <Skeleton animation="wave" width="50%" height={40} sx={{ bgcolor: "#0A4E4E" , opacity:0.2 }} /> 
            <Skeleton animation="wave" width="30%" height={40} sx={{ bgcolor: "#0A4E4E" , opacity:0.2 }} />  
      </Box>

      <Box sx={{position:'absolute' ,display:'flex',top:0,left:30,right:30,justifyContent:"center" , px:2}}>
            <Skeleton animation="wave" width="70%" height={300} sx={{ bgcolor: "#0A4E4E" , opacity:0.1 }}  />
      </Box>
      <Box sx={{ position: "absolute", bottom: 20, left: 50,right: 50, display: "flex", flexDirection: "column", alignItems: "center",  }}>
            <Skeleton animation="wave" width="50%" height={30} sx={{ bgcolor: "#0A4E4E", opacity: 0.2 }}/>
            <Skeleton animation="wave" width="50%" height={30} sx={{ bgcolor: "#0A4E4E", opacity: 0.2 }}/>
      </Box>
    </Box>
  );
};

export default SkeletonLoaderGraph;
