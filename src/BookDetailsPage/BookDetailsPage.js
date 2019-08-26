import React from 'react';

import STORE from '../store.js';

class BookDetailsPage extends React.Component {
	
	render() {
		let item = this.props.item;
		//let item = STORE.items[0];
		
		let authorCount = !item.volumeInfo.authors? 0 : item.volumeInfo.authors.length;		
		let authorLine = authorCount>0?`Author${authorCount>1?"s":""}: ${item.volumeInfo.authors.join(", ")}`:false;
		
		let price = item.saleInfo.saleability==="FOR_SALE"? "Price:  $"+item.saleInfo.retailPrice.amount:false;
		
		return (
			<section>
				<br />
				<button onClick={this.props.backToSearchResults}>Click to go back to search page</button>
				<h2>{item.volumeInfo.title}</h2>
				<p>{authorLine}</p>
				<p>{price}</p>
				<img src={item.volumeInfo.imageLinks.thumbnail} />
				<p>{item.volumeInfo.description}</p>
			</section>
		);
	}
}

export default BookDetailsPage;
