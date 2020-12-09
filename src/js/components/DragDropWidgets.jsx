
// import { Draggable, DropZone } from 'react-drag-or-touch-drop';
import React, { useState } from 'react';
// import { Draggable, DropZone } from '../base/components/DragDrop';
import { Draggable, DropZone } from 'react-drag-or-touch-drop';
import { Badge } from 'reactstrap';
import DataStore from '../base/plumbing/DataStore';
import SubCard from './SubCard';
import WidgetExample from './WidgetExample';


const DragDropWidgets = () => {
	
	// NB: Drag-and-drop does not manage your app's data/state -- that is 100% up to you, to do how you prefer.
	let [list] = useState([]);
	let textForDraggableId = {d1:"Hello :)", d2:"Yeh!"};

	return (<SubCard title="Drag and Drop">

		<WidgetExample name="Drag and Drop - simple drop-in list">
			
			<Draggable id='d1'><div className='badge badge-success w-25'>{textForDraggableId.d1}</div></Draggable>
			<Draggable id='d2'><div className='badge badge-info w-25'>{textForDraggableId.d2}</div></Draggable>
			
			<DropZone id='dropzone1' 
				onDrop={(e, dropInfo) => list.push(textForDraggableId[dropInfo.draggable]) && DataStore.update() && console.log("You dropped this", dropInfo)}
			>
				<p>Drop here</p>
				<ol>
					{list.map((item,i) => <li key={i}>{item}</li>)}
				</ol>
			</DropZone>
		</WidgetExample>

	</SubCard>);
};

export default DragDropWidgets;
