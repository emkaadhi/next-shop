import React from 'react'

const Footer = () => {
    return (
        <footer className="bg3 p-t-75 p-b-32">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-3 p-b-50">
                        <h4 className="stext-301 cl0 p-b-30">
                            Categories
                        </h4>
                        <ul>
                            <li className="p-b-10">
                                <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                    Women
                                </a>
                            </li>
                            <li className="p-b-10">
                                <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                    Men
                                </a>
                            </li>
                            <li className="p-b-10">
                                <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                    Accesories
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-lg-3 p-b-50">
                        <h4 className="stext-301 cl0 p-b-30">
                            Bantuan
                        </h4>
                        <ul>
                            <li className="p-b-10">
                                <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                    Pelacakan Pemesanan
                                </a>
                            </li>
                            <li className="p-b-10">
                                <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                    Pengembalian / Claim
                                </a>
                            </li>
                            <li className="p-b-10">
                                <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                    Pengiriman
                                </a>
                            </li>
                            <li className="p-b-10">
                                <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                    Tanya Jawab
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-lg-3 p-b-50">
                        <h4 className="stext-301 cl0 p-b-30">
                            GET IN TOUCH
                        </h4>
                        <p className="stext-107 cl7 size-201">
                            Toko Kita Online Store
                            <br />
                            <br />
                            Jalan perdatam no 5
                            Surakarta , Jawa Tengah
                            <br />
                            <br />
                            Phone: (021) 123-XXXX
                            <br />
                            Email: info@tokokita.com
                        </p>
                        <div className="p-t-27">
                            <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                <i className="fa fa-facebook" />
                            </a>
                            <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                <i className="fa fa-instagram" />
                            </a>
                            <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                <i className="fa fa-pinterest-p" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 p-b-50">
                        <h4 className="stext-301 cl0 p-b-30">
                            Newsletter
                        </h4>
                        <form>
                            <div className="wrap-input1 w-full p-b-4">
                                <input className="input1 bg-none plh1 stext-107 cl7" type="text" name="email" placeholder="email@example.com" />
                                <div className="focus-input1 trans-04" />
                            </div>
                            <div className="p-t-18">
                                <button className="btn btn-primary mt-3 btn-sm btn-block">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="p-t-10">
                    <p className="stext-107 cl6 txt-center">
                        Copyright ©2022 All rights reserved | tokokita.com
                    </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer