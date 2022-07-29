import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../config/firebase'
import { get_carts } from '../../store/cart/CartSlice'
import { login, logout, selectUser } from '../../store/user/UserSlice'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import Swal from 'sweetalert2'

const NavbarMain = () => {

    const user = useSelector(selectUser);

    const carts = useSelector((state) => state.cart.carts)

    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        dispatch(get_carts())
    }, [dispatch])

    const totalAmount = (carts || []).reduce((a, b) => {
        return a + b.amount
    }, 0)

    useEffect(() => {
        totalAmount
    }, [])

    const logoutOfApp = () => {
        if (carts.length !== 0) {
            Swal.fire({
                position: 'top-end',
                title: `masih ada order di keranjang silakan di proses atau dibatalkan!`,
                showConfirmButton: false,
                timer: 2500
            })
            router.push('/cart')
        } else {
            dispatch(logout());
            auth.signOut();
            router.push('/auth/login')
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <Link href={`/`}>
                        <a className="navbar-brand"><img src="./img/tokologorm.png" alt="" style={{ width: '100px' }} /></a>
                    </Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link href={`/`}>
                                    <a className="nav-link"><b>Toko Kita</b></a>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link href={`/product`}>
                                    <a className="nav-link">Produk kami</a>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                            {
                                !user ? (
                                    <>
                                        <li className="nav-item active">
                                            <Link href={`/auth/login`}>
                                                <a className="nav-link">Login</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item active">
                                            <Link href={`/auth/register`}>
                                                <a className="nav-link">Register</a>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item active">
                                            <Link href={`/cart`}>
                                                <a className="nav-link"><i className="fas fa-shopping-bag" /><span className="badge bg-purple ml-1">{totalAmount}</span></a>
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown active">
                                            <a className="nav-link dropdown-toggle" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user-alt mr-1" />
                                                {user?.email}</a>
                                            <div className="dropdown-menu" aria-labelledby="dropdownId">
                                                <button className="dropdown-item" onClick={logoutOfApp}><i className="fas fa-key mr-1" /> Logout</button>
                                            </div>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default NavbarMain