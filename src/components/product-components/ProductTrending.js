import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_trending } from '../../store/product/ProductSlice'
import { numberWithCommas } from '../../utils/constant'
import Link from 'next/link';
import CardProduct from './CardProduct'

const ProductTrending = () => {

    const products = useSelector((state) => state.product.trending)

    const loading = useSelector((state) => state.product.isLoadingTending)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_trending())
    }, [dispatch])
    return (
        <>
            <div>
                <div className="heading">
                    <h2>Trending Produk</h2>
                </div>
                <hr className="hr-heading" />
            </div>
            <div className="container">
                <div className="row mt-3">
                    {
                        loading ? (
                            <div className="d-flex justify-content-center mt-3">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : products && (
                            products.map((product) => {
                                return (
                                    <CardProduct product={product} key={product.id}/>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductTrending