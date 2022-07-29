import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_single_product } from '../../store/product/ProductSlice'
import Navbar from '../main-components/NavbarMain'
import { numberWithCommas } from '../../utils/constant'
import ProductTrending from './ProductTrending'
import { add_cart, get_carts } from '../../store/cart/CartSlice'
import Swal from 'sweetalert2'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { selectUser } from '../../store/user/UserSlice'
import Link from 'next/link'

const ProductDetail = () => {
    const product = useSelector((state) => state.product.single)
    const loading = useSelector((state) => state.product.isLoadingSingle)

    const user = useSelector(selectUser)


    const addCart = useSelector((state) => state.cart.addCart)

    const dispatch = useDispatch()
    const router = useRouter()

    let { id } = router.query

    useEffect(() => {
        if (id) {
            dispatch(get_single_product(id))
        }
    }, [dispatch, id])

    const onCart = (value) => {
        dispatch(add_cart(value))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Order : ${value.name} sukses! , silakan cek keranjang belanja anda `,
            showConfirmButton: false,
            timer: 2500
        })

    }

    useEffect(() => {
        if (addCart) {
            dispatch(get_carts())
        }
    }, [dispatch, addCart])

    return (
        <>
            <div>
                <div className="heading">
                    <h2>Detail Produk</h2>
                </div>
                <hr className="hr-heading" />
            </div>
            {
                loading ? (
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : product && (
                    <div className="container">
                        <div className="product-content product-wrap clearfix product-deatil">
                            <div className="row">
                                <div className="col-md-5 col-sm-12 col-xs-12">
                                    <img src={product.imageUrl} alt width="400px" />
                                </div>
                                <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                                    <h2 className="name text-uppercase mb-3">
                                        {product.name}
                                    </h2>
                                    <h5 className='mb-3'><small>Kategori : <a>{product.category.name}</a></small></h5>
                                    {product.rating}<i className="fa fa-star fa-2x text-danger ml-2" />
                                    <a className='ml-4'>0 customer reviews</a>
                                    <hr />
                                    <h3 className="price-container mt-3">
                                        Rp {numberWithCommas(product.price)} ,00
                                        <small className='ml-2'>*termasuk pajak</small>
                                    </h3>
                                    <div className="certified mt-4">
                                        <ul>
                                            <li>
                                                <a >Waktu Pengiriman <span>7 hari kerja</span></a>
                                            </li>
                                            <li>
                                                <a >Serifikat <span>Quality Assured/Original</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr />
                                    <div className="description description-tabs">
                                        <p>{product.description}</p>
                                    </div>
                                    <hr />
                                    {
                                        user && user ? (
                                            <div className="row">
                                                <div className="col-sm-12 col-md-8 col-lg-8 mt-2">
                                                    <button className="btn bg-purple btn-lg btn-flat" onClick={() => onCart(product)}><i className="fas fa-shopping-cart mr-2"></i> Masukkan ke keranjang</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                <div className="col-sm-12 col-md-8 col-lg-8 mt-3">
                                                    <Link href={`/auth/login`}>
                                                        <button className="btn bg-purple btn-lg btn-flat" ><i className="fas fa-sign-in-alt mr-2"></i> Login untuk order</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <ProductTrending />
        </>
    )
}

export default ProductDetail