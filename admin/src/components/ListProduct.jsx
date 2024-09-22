import { useEffect, useState } from 'react';
import './ListProduct.css';
import removeIcon from '../assets/removeIcon.jpg';

function ListProduct() {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product= async(id)=>{
    await fetch ('http://localhost:5000/removeproduct',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({id:id})  
    })
    await fetchInfo();

  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className='listproduct-formate-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproduct'>
        <hr />
        {allProducts.map((product) => ( 
          
          <div key={product._id} className='listproduct-formate-main listproduct'>
            <img src={product.image} alt={product.name} className='listproduct-product' />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img className='listproduct-remove-icon' src={removeIcon} onClick={()=>{remove_product(product.id)}} alt="Remove" />
          </div>
          
        ))}
        
      </div>
    </div>
  );
}

export default ListProduct;
