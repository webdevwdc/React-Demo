import React, { Component } from 'react';
import './leftSidebar.scss';
import { List, ListItem, Divider, Tooltip, Icon } from '@material-ui/core';
import Pagination from '../pagination'
import DragItem from '../drag-item/index';

class LeftSidebar extends Component {

	constructor(props) {
		super(props)

		this.state = {
			elements: [
				{ id: 1, text: 'Input', content: `<input class="inputStyle" placeholder="Enter Value" type="text" id="${Math.random()}"/>` },
				{ id: 2, text: 'Textarea', content: `<textarea class="textareaStyle" placeholder="Enter Value" type="text" id="${Math.random()}"/>` },
			],
			attributes: [
				{ id: 1, text: 'Form Attribute 1' },
			],
			completedElement: [],
			completedAttribute: [],
			draggedElement: [],
			draggedAttribute: [],
		}
	}

	render() {
		return (
			<div className="leftSidebar">
				<List component="nav" className="nav">
					<ListItem>
						<h4>Form Elements
							<Tooltip title="Information" placement="right">
								<Icon color="disabled">info</Icon>
							</Tooltip>
						</h4>
					</ListItem >
					<Divider />
					{this.state.elements.map((element, key) => (
						<ListItem key={key}>
							<DragItem id={element.id} data={element} key={element.id} />
							<button>+ Add</button>
						</ListItem>
					))}
					<Divider />
				</List>
				<Pagination />

				<List component="nav" className="nav">
					<ListItem>
						<h4>Form Attributes
							<Tooltip title="Information" placement="right">
								<Icon color="disabled">info</Icon>
							</Tooltip>
						</h4>
					</ListItem>
					<Divider />
					{this.state.attributes.map((attribute, key) => (
						<ListItem key={key}>
							<DragItem id={attribute.id} data={attribute} key={attribute.id} />
							<button><span>+</span> Add</button>
						</ListItem>
					))}
					<Divider />
				</List>
				<Pagination />

			</div>
		)
	}
}

export default LeftSidebar;