import React from 'react';

import './SearchForm.css';

class SearchForm extends React.Component {
	
	constructor() {
		super();
		
		this.state = {
			searchText: '',
			printType: 'all',
			bookType: 'no-filter',
			err: null
		};
	}
		
	getSearchString() {
		return encodeURIComponent( this.state.searchText.split(" ").join("+") );
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		let searchString = "";
		
		let filter = (this.state.bookType!=="no-filter")? ("&filter="+this.state.bookType):"";
		let url = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyCSto0UhRSAEgIWa4xNEDFPPW3o8d89PZU&q=${this.getSearchString()}&printType=${this.state.printType}`+filter;

		fetch(url)
			.then(res => {
				if(!res.ok) {
					throw new Error('Something went wrong, please try again later');
				}
				return res.json();
			})
			.then(data => {
				this.props.receiveSearchResults(data);
			})
			.catch(err => {
				this.setState({
					error: err.message
				});
			});
	}
		
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			
				{/* Search Box */}
				<div className="searchBox">
					Search: &nbsp;
					<input type="text" value={this.state.searchText} onChange={e => this.setState({searchText: e.target.value})} required />
					<input type="submit" />
				</div>
				
				
				{/* Filters */}
				<div className="filterBox">
					<label htmlFor="printType">Print Type: </label>
					<select id="printType" value={this.state.printType} onChange={e => this.setState({"printType":e.target.value})}>
						<option value="all">All</option>
						<option value="books">Books</option>
						<option value="magazines">Magazines</option>
					</select>
					
					&nbsp;
					
					<label htmlFor="bookType">Book Type: </label>
					<select id="bookType" value={this.state.bookType} onChange={e => this.setState({"bookType":e.target.value})}>
						<option value="no-filter">No Filter</option>
						<option value="partial">Partial Preview</option>
						<option value="full">Full Text</option>
						<option value="free-ebooks">Free Ebooks</option>
						<option value="paid-ebooks">Paid Ebooks</option>
						<option value="ebooks">All Ebooks</option>
					</select>
				</div>
				
			</form>
		);
	}
}

export default SearchForm;
