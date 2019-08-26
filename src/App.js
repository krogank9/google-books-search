import React from 'react';

import SearchForm from './SearchForm/SearchForm';
import BookList from './BookList/BookList';
import BookDetailsPage from './BookDetailsPage/BookDetailsPage';

import './App.css';

class App extends React.Component {
	
	constructor() {
		super();
		
		this.state = {
			searchResults: null,
			bookPageData: null,
			showBookPage: false
		};
	}
	
	showBookPage = (item) => {
		this.setState({
			bookPageData: item,
			showBookPage: true
		});
	}
	
	backToSearchResults = () => {
		this.setState({showBookPage: false});
	}
	
	receiveSearchResults = (json) => {
		this.setState({searchResults: json});
	}
	
	render() {
		
		let pageContent;
		
		if(this.state.showBookPage) {
			pageContent = (
				<BookDetailsPage
					item={this.state.bookPageData}
					backToSearchResults={this.backToSearchResults}
				/>
			);
		}
		else {
			pageContent = (<>
				<SearchForm
					receiveSearchResults={this.receiveSearchResults}
				/>
				<BookList
					searchResults={this.state.searchResults}
					showBookPage={this.showBookPage}
				/>
			</>);
		}
		
		return (
			<main className='App'>
				<h1 className="title">Google Book Search</h1>
				{pageContent}
			</main>
		);
	}
}

export default App;
