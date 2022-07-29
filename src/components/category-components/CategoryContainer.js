import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/category/CategorySlice'
import Link from 'next/link'

const CategoryContainer = () => {

    const categories = useSelector((state) => state.category.category)
    // console.log(categories);
    const loading = useSelector((state) => state.category.isLoadingCategory)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_categories())
    }, [dispatch])

    return (
        <>
            <div className="heading">
                <h2>Kategori Pilihan</h2>
            </div>
            <hr className="hr-heading" />
            <div className="container">
                <div className="row">
                    <div className="card-group">
                        {
                            loading ? (
                                <div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : categories && (
                                categories.map((cat) => {
                                    return (
                                        <Link href={{ pathname: '/category', query: { id: cat.id } }} key={cat.id}>
                                            <div className="card">
                                                <a>
                                                <img className="card-img-top" src={cat.imageUrl} alt="Card image cap" />
                                                    <div className="cat-text">
                                                        <h2>{cat.name}</h2>
                                                        <p>2022 Collection</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </Link>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryContainer