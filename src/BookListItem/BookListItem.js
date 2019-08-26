import React from 'react';

import './BookListItem.css';

class BookListItem extends React.Component {
	
	render() {
		let item = this.props.item;
		
		let dflex = {display: "flex"};
		let fleft = {float: "left"};
		
		let authorCount = !item.volumeInfo.authors? 0 : item.volumeInfo.authors.length;		
		let authorLine = authorCount>0?`Author${authorCount>1?"s":""}: ${item.volumeInfo.authors.join(", ")}`:false;
		
		let price = item.saleInfo.saleability==="FOR_SALE"? "Price:  $"+item.saleInfo.retailPrice.amount:false;
		
		let bookImage = item.volumeInfo.imageLinks? <img src={item.volumeInfo.imageLinks.thumbnail} style={fleft} /> : false;
		
		let shortDescr = false;
		if(item.searchInfo) {
			shortDescr = <span className="maxWidth75" dangerouslySetInnerHTML={{ __html: item.searchInfo.textSnippet }}></span>;
		}
		
		return (
			<li className="greyBorderTop cursorPointer" onClick={() => this.props.showBookPage(item)}>
				<h2>{item.volumeInfo.title}</h2>
				<div className="flex">
					{bookImage}
					<p className="flex-1">
						<span>
							{authorLine}
						</span>
						
						<br />
						
						<span>
							{price}
						</span>
						
						<br /><br />
						
						{shortDescr}
					</p>
				</div>
			</li>
		);
	}
}

export default BookListItem;
