import React, { Component } from 'react';
import './ToDoDragDrop.style.css';

export default class ToDoDragDropDemo extends Component {
    state = {};
    constructor(props){
        super(props);
        this.state ={ tasks: [
              {id: "1", taskName:"Read book",type:"inProgress", backgroundColor: "red"},
              {id: "2", taskName:"Pay bills", type:"inProgress", backgroundColor:"green"},
              {id: "3", taskName:"Go to the gym", type:"Done", backgroundColor:"blue"},
              {id: "4", taskName:"Play baseball", type:"Done", backgroundColor:"green"}
            ]
        };
    }
	onDragStart = (event, taskName) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}
	onDragOver = (event) => {
	    event.preventDefault();
	}

	onDrop = (event, cat) => {
	    let taskName = event.dataTransfer.getData("taskName");

	    let tasks = this.state.tasks.filter((task) => {
	        if (task.taskName == taskName) {
	            task.type = cat;
	        }
	        return task;
	    });

	    this.setState({
	        ...this.state,
	        tasks
	    });
	}
	render() {
		var tasks = {
	      inProgress: [],
	      Done: []
	    }

		this.state.tasks.forEach ((task) => {
		  tasks[task.type].push(
		    <div key={task.id} 
		      onDragStart = {(event) => this.onDragStart(event, task.taskName)}
		      draggable
		      className="draggable"
		      style = {{backgroundColor: task.bgcolor}}>
		      {task.taskName}
		    </div>
		  );
		});

	    return (
	      <div className="drag-container">
	        <h2 className="head">To Do List Drag & Drop</h2>
		    <div className="inProgress"
	    		onDragOver={(event)=>this.onDragOver(event)}
      			onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
	          <span className="group-header">Form</span>
	            <div>
					<label>First Name</label>
					<input type="text" />
				</div>
	        </div>
	        <div className="droppable"
	        	onDragOver={(event)=>this.onDragOver(event)}
          		onDrop={(event)=>this.onDrop(event, "Done")}>
	          <span className="group-header">DropDown</span><br/>
	           <select >
				   <option>Option1</option>
				   <option>Option2</option>
				   <option>Option3</option>
				   <option>Option4</option>
			   </select>
	        </div>	        
	      </div>
	    );
  	}
}