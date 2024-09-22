import './Navbar.css'
import profile  from'../assets/profile.jpg'
import shopping from '../assets/shopping.jpg'
import arrow_down from '../assets/arrow_down.jpg'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navcontainer'>
            <div className='nav-logo'>
            <img src={shopping} className='navlogo' alt=""/>
            <p>!Shopping</p>
            </div>
            
            <div className='navprofile'>
                <img src={profile} alt="" className='nav-profile'/>
                <img src={arrow_down} alt=""/>
            </div>
        </div>
    </div>
  )
}

export default Navbar