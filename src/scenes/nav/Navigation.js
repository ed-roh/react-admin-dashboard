import React from 'react'
import './Navigation.css'

function Navigation() {
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <img className='img' src="https://hopingminds.com/wp-content/uploads/2023/01/Asset-5.png" alt="" />
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </nav>
        </div>
    )
}

export default Navigation