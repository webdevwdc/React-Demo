import React, { Component } from 'react';
import './pagination.scss';

class Pagination extends Component {
	render() {
		return(
			<ul className="pagination">
				<li></li>
				<li className="active">1</li>
				<li>2</li>
				<li>3</li>
				<li></li>
			</ul>
		)
	}
}

export default Pagination;