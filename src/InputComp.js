import React from 'react';

let inputBox =(props) => {
    
    return (<div>
            <h3 align = "center" >Enter Text</h3>
           <textarea id="inputbox" rows="6" cols="100" onChange={props.change} value={props.text}/>
        </div>)
};

export default inputBox;