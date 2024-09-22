import './Sidebar.css'
import cartIcon from '../assets/cartIcon.jpg'
import list from '../assets/list.jpg'
import { Link } from 'react-router-dom'; // Corrected import

function Sidebar() {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'}>
        <div className='sidebar-item'>
            <img src={cartIcon} alt="" />
            <p>Add Product</p>
        </div>
    </Link>
    <Link to={'/listproduct'}>
        <div className='sidebar-item'>
            <img src={list} alt="" />
            <p>Add Product</p>
        </div>
    </Link>
       
    </div>
  )
}

export default Sidebar