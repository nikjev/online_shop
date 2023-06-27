import React from "react";
import "../style/shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function ShoppingCart({
	visibilty,
	products,
	onProductRemove,
	onClose,
	onQuantityChange,
}) {
	const calculateTotalPrice = () => {
		let totalPrice = 0;
		products.forEach((product) => {
		  totalPrice += product.price * product.count;
		});
		return totalPrice.toFixed(2); 
	  };

	  
	return (
		<div className="modal" style={{ display: visibilty ? "block" : "none",}}>
			<div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
					<button className="btn close-btn" onClick={onClose}>
						<AiFillCloseCircle size={30}/>
					</button>
				</div>
				<div className="cart-products">{products.length === 0 && (<span className="empty-text">Empty</span>)}
					{products.map((product) => (
						<div className="cart-product" key={product.id}>
							<img src={product.image} alt={product.name}/>
							<div className="product-info">
								<h3>{product.name}</h3>
								<span className="product-price">{(product.price * product.count).toFixed(2)}$</span>
							</div>
							<select className="count" value={product.count} onChange={(event) => {onQuantityChange(product.id, event.target.value);
							}}>
								{[...Array(5).keys(),].map((number) => {
										const num = number + 1;
										return (
											<option value={num} key={num}>{num}</option>
										);
									}
								)}
							</select>
							<button className="btn remove-btn" onClick={() => onProductRemove(product)}>
								<RiDeleteBin6Line size={20}/>
							</button>
						</div>
					))}
							<div className="total-price">
						<div className="price">
                	Total Price: <strong>{calculateTotalPrice()}$</strong>
						</div>
						</div>
					{products.length > 0 && (
						
						<button className="btn checkout-btn">Checkout</button>
					)}
					
              	
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
