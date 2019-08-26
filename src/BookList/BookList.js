import React from 'react';

import './BookList.css';

import BookListItem from '../BookListItem/BookListItem';

class BookList extends React.Component {
	
	renderLi = (item) => {
		return (
			<BookListItem showBookPage={this.props.showBookPage} item={item} key={item.id} />
		);
	}
	
	render() {
		let resultsList;
		
		if( this.props.searchResults ) {
			if( this.props.searchResults.items.length > 0 ) {
				resultsList = (
					<ul className="searchResultsList">
						{this.props.searchResults.items.map(this.renderLi)}
					</ul>
				);
			}
			else {
				resultsList = (
					<p>
						0 results found. Try another query.
					</p>
				);
			}
		}
		else {
			// No search has been made yet
			resultsList = (
				<p>
					Type a query and select filters to get started.
				</p>
			);
		}
		
		return (
			<>{resultsList}</>
		);
	}
}

export default BookList;
