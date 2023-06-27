import React, {useState, useEffect,} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "Vivamus vitae",
		description:
			"Vivamus vitae neque accumsan, ultrices nisl et, viverra magna. Fusce nec maximus sem.",
		price: 199.99,
		image: require("./assets/images/product-1.png"),
	},
	{
		id: 2,
		name: "Fusce sit amet ipsum",
		description:
			"Maecenas fermentum urna egestas urna ullamcorper sodales. Sed a enim imperdiet, tempus massa a, iaculis tellus.",
		price: 229.99,
		image: require("./assets/images/product-2.png"),
	},
	{
		id: 3,
		name: "Etiam volutpat aliquam",
		description:
			"Praesent et orci vel nunc interdum aliquet et non dolor. Etiam eget finibus justo",
		price: 99.99,
		image: require("./assets/images/product-3.png"),
	},
	{
		id: 4,
		name: "Lorem ipsum dolor",
		description:
			"Duis nibh sapien, placerat non nulla ac, suscipit laoreet tortor.",
		price: 119.99,
		image: require("./assets/images/product-4.png"),
	},
	{
		id: 5,
		name: "Ultrices nisl",
		description:
			"Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
		price: 85,
		image: require("./assets/images/product-5.jpg"),
	},
	{
		id: 6,
		name: "Curabitur in elementum tortor",
		description:
			" Mauris convallis diam nibh, non malesuada enim facilisis non. Etiam sapien augue, molestie a porta sed",
		price: 149.99,
		image: require("./assets/images/product-6.png"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(JSON.parse(localStorage.getItem("shopping-cart")) || []);
		
	useEffect(() => {localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));}, [productsInCart]);
	
	
	const addProductToCart = (product) => {
		const existingProductIndex = productsInCart.findIndex((item) => item.id === product.id);
		if (existingProductIndex !== -1) {
		  const updatedCart = [...productsInCart];
		  updatedCart[existingProductIndex].count += 1;
		  setProducts(updatedCart);
		} else {
		  const newProduct = {
			...product,
			count: 1,
		  };
		  setProducts([...productsInCart, newProduct]);
		}
		
	  };

	const onQuantityChange = (productId, count) => {
		setProducts((oldState) => {
			const productsIndex = oldState.findIndex((item) => item.id === productId);
			if (productsIndex !== -1) {
				oldState[productsIndex].count = count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) => item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() => setCartVisible(false)}
				onQuantityChange={onQuantityChange}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">iShop</h3>
				<button className="btn shopping-cart-btn" onClick={() => setCartVisible(true)}>
					<GiShoppingBag size={24} />
					{productsInCart.length > 0 && (<span className="product-count">{productsInCart.length}</span>)}
				</button>
			</div>
			<main>
				<h2 className="title">Our products:</h2>
				<div className="products">
					{products.map((product) => (
						<div className="product" key={product.id}>
							<img className="product-image" src={product.image} alt={product.image}/>
							<h4 className="product-name">{product.name}</h4>
							<p>{product.description}</p>
							<span className="product-price">{product.price}$</span>
							<div className="buttons">
								<button className="btn" onClick={() => addProductToCart(product)}>Add to cart</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;
