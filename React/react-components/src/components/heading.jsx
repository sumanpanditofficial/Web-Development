import React from "react";
import ReactDom from 'react-dom';
import {add, sub} from '../demo.js'
function Heading(){
    return(
        <div>
           <ul>
            <li>{add(5, 6)}</li>
            <li>{sub(7,5)}</li>
           </ul>
        </div>
    );
}
export default Heading; 