import React from "react";
const currentDate = new Date();
const getFullYear = currentDate.getFullYear();
function Footer(){
    return(
        <div>
            <footer>copyright©️ {getFullYear}</footer>
        </div>
    )
}
export default Footer;
