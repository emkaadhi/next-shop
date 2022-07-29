import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../../store/product/ProductSlice';
import { numberWithCommas } from '../../utils/constant';
import CardProduct from './CardProduct';

const Products = () => {
    const products = useSelector((state) => state.product.products)
    
    const loading = useSelector((state) => state.product.isLoadingProducts)

    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_products())
    }, [dispatch])

    return (
        <>
            <div>
                <div className="heading">
                    <h2>Produk Kami</h2>
                </div>
                <hr className="hr-heading" />
            </div>
            <div className="container">
                <div className="form-group">
                    <input type="text" className="form-control mb-3" placeholder="cari berdasarkan nama produk atau kategori (eg. men , women , women shirt )..." onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="row mt-3">
                    {
                        loading ? (
                            <div className="d-flex justify-content-center mt-3">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : products && (
                            products
                                .filter((value) => {
                                    if (search === "") {
                                        return value;
                                    }
                                    else if
                                        (
                                        value.name.toLowerCase().includes(search.toLowerCase())
                                    ) {
                                        return value;
                                    }
                                    else if
                                        (
                                        value.category.name.toLowerCase().includes(search.toLowerCase())
                                    ) {
                                        return value;
                                    }
                                })
                                .map((product) => {
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

export default Products