import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { get_product_category } from '../../store/category/CategorySlice'
import CardProduct from '../../components/product-components/CardProduct'

const CategoryProduct = () => {

    const products = useSelector((state) => state.category.product_category)
    const loading = useSelector((state) => state.category.isLoadingProductCategory)

    const dispatch = useDispatch()
    const router = useRouter()

    let { id } = router.query

    useEffect(() => {
        if (id) {
            dispatch(get_product_category(id))
        }
    }, [dispatch, id])
    return (
        <>
            <div>
                <div className="heading">
                    <h2>Kategory Produk</h2>
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
                                    <CardProduct product={product} />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryProduct