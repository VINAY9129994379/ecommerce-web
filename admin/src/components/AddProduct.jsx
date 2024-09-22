import './AddProduct.css'; // Ensure this file exists
import upload from '../assets/upload.jpg';
import { useState } from 'react';

function AddProduct() {
    const [image, setImage] = useState(null); // Set image to null initially, not false
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
        available: true 
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let product = productDetails;
        let formData = new FormData(); // Correct capitalization
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            });
            const responseData = await uploadResponse.json();

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);

                const addProductResponse = await fetch('http://localhost:5000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product), // Fixed typo: `body.JSON.stringify` to `JSON.stringify`
                });

                const productData = await addProductResponse.json();
                productData.success ? alert("Product Added") : alert("product added");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className='addproduct'>
            <div className='product-itemfield'>
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type='text'
                    name='name'
                    placeholder='Type here'
                />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type='text'
                        name='old_price'
                        placeholder='Type here'
                    />
                </div>
                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type='text'
                        name='new_price'
                        placeholder='Type here'
                    />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className='add-product-selector'
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img
                        src={image ? URL.createObjectURL(image) : upload}
                        alt="Thumbnail"
                        className='addproduct-thumbnail-img'
                    />
                </label>
                <input
                    onChange={imageHandler}
                    type="file"
                    name='image'
                    id='file-input'
                />
            </div>
            <button className='addproduct-btn' onClick={Add_Product}>Add</button>
        </div>
    );
}

export default AddProduct;
