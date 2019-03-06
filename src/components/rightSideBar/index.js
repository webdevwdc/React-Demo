import React, { Component } from 'react';
import './rightSidebar.scss';
import { List, ListItem, Divider } from '@material-ui/core';

class RightSidebar extends Component {
	constructor() {
		super();
		this.state = {
			attributes: [
				{ attributeID: 1, attributeNo: 'Attribute 1' },
				{ attributeID: 2, attributeNo: 'Attribute 2' },
				{ attributeID: 3, attributeNo: 'Attribute 3' },
				{ attributeID: 4, attributeNo: 'Attribute 4' },
				{ attributeID: 5, attributeNo: 'Attribute 5' }
			],
		};
	}
	render() {
		return (
			<div className="rightSidebar">
				<List component="nav" className="nav">
					<ListItem>
						<h4>Element Attributes</h4>
					</ListItem >
					<Divider />
					{this.state.attributes.map((attribute, key) => (
						<ListItem key={key} draggable>
							<span>{attribute.attributeNo}</span>
							<button><span>+</span> Add</button>
						</ListItem>
					))}
					<Divider />
				</List>
			</div>
		)
	}
}

export default RightSidebar;