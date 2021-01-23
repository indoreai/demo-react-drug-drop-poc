import React,{ useState } from 'react';
import './dnd.style.css';

const DndComp =  (props) => {
    const [isEnble, setEnable] = useState(false);
    //Drag Start
    function dragStart(ev) {
        setEnable(false);
       // ev.preventDefault();
        ev.dataTransfer.effectAllowed='move';
        ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
        ev.dataTransfer.setDragImage(ev.target,0,0);
        return true;
     }

     //Drag Stop
     function dragEnter(ev) {
        ev.preventDefault();
        console.error("dragEnter")
        return true;
     }

    
     function dragOver(ev) {
        ev.preventDefault();
         console.error("dragOver")
        //return false;
     }


     function dragDrop(ev) {
         console.clear()
         ev.preventDefault();
        console.error("dragDrop")
        var src = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(src));
        ev.stopPropagation();
        setEnable(true);
        return false;
     }
    return (<center>
       <div className="header">
        <h2>Drag and drop POC</h2>
      </div>
        <div id="boxA">
           <div></div>
           <p id="btn" onDragStart={(e)=> dragStart(e)}>
               
               <select draggable  disabled={!isEnble ? 'disabled' : null}  id="btn">
                     <option>Option1</option>
                     <option>Option2</option>
                     <option>Option3</option>
                     <option>Option4</option>
               </select>
               {/* <button draggable  id="btn" onDragStart={(e)=> dragStart(e)} >Drag</button> */}
               </p>
        </div>
        <div id="boxB" onDragEnter={(e)=> dragEnter(e)} onDrop={(e)=>dragDrop(e)} onDragOver={(e)=> dragOver(e)}>
        </div>
     </center>);
}


export default DndComp;