import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './review_headers.css';
import { Container } from "react-bootstrap";
import {ToggleButtonGroup, styled} from '@mui/material';
import MuiToggleButton from "@mui/material/ToggleButton";


const ReviewHeaders = (props) => {
    const header="Ratings and Reviews";

    const [starState, setStarState] = React.useState('')

    const handleChange = (event, newStarState) => {
        if(newStarState !== null){
            setStarState(newStarState);
            props.handleToggle(newStarState);
        }
    };

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "white",
          backgroundColor: "#1C3103"
        }
      });

    return(
        <Container className="review-container">
            <h4 className="review-header">{header}</h4>
            <Container className="review-numstar-button">
                <ToggleButtonGroup
                    size="small"
                    onChange={handleChange}
                    value={starState}
                    exclusive
                >
                    <ToggleButton  className='s-add-style' value="all" aria-label="all">
                        <p>All</p>
                    </ToggleButton>
                    <ToggleButton  className='s-add-style' value="5" aria-label="s1">
                        <p>5 Star</p>
                    </ToggleButton>
                    <ToggleButton  className='s-add-style' value="4" aria-label="s2">
                        <p>4 Star</p>
                    </ToggleButton>
                    <ToggleButton  className='s-add-style' value="3" aria-label="s3">
                        <p>3 Star</p>
                    </ToggleButton>
                    <ToggleButton  className='s-add-style' value="2" aria-label="s4">
                        <p>2 Star</p>
                    </ToggleButton>
                    <ToggleButton   className='s-add-style' value="1" aria-label="s5">
                        <p>1 Star</p>
                    </ToggleButton>

                </ToggleButtonGroup>
            </Container>
        </Container>
    )
}

export default ReviewHeaders;