import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rating } from "@mui/material";

const MUIStarRating = () =>{
    return(
        <Rating
            className="rating-medium"
            defaultValue={3.5}
            precision={0.5}
            sx={{
              fontSize: "2rem",
              color: "#1C3103"
            }}
        />
    )
}

export default MUIStarRating;