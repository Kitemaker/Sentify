import React from 'react';
import './ScoreCard.css';
let ScoreCard =(props) => {

    return (
        <div className="w3-card-4" style={{ margin: '10px'}}>
            <div className="w3-container w3-light-blue"  >
                <h3>{props.section}</h3>
            </div>            
            <p>{props.section_score}</p>            
           
        </div>
    )
          

};

export default ScoreCard;