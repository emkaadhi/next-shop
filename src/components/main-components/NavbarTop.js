import React from 'react'

const NavbarTop = () => {
    return (
        <>
            <div className="nav-top p-2 d-none d-sm-block">
                <div className="content-topbar flex-sb-m h-full container">
                    <div className="left-top-bar">
                        Bebas Ongkir dengan pembelian diatas Rp 1.000.000,00
                    </div>
                    <div className="social-contact ml-4 ml-sm-auto">
                        <span className="fa fa-facebook mr-4 text-sm"><i className="fab fa-facebook" /></span>
                        <span className="fa fa-google-plus mr-4 text-sm"><i className="fab fa-google" /></span>
                        <span className="fa fa-linkedin mr-4 text-sm"><i className="fab fa-instagram" /></span>
                        <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"><i className="fab fa-twitter" /></span>
                    </div>
                    <div className="right-top-bar flex-w h-full">
                        <img src="./img/indo.png" alt="" style={{width:'25px',marginRight:'3px'}}/>
                        <a  className="flex-c-m trans-04">
                            IND
                        </a>
                        <a  className="flex-c-m trans-04 p-lr-25">
                            IDR
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarTop