import Link from 'next/link'
import React from 'react'
import { numberWithCommas } from '../../utils/constant'

const CardProduct = ({ product }) => {
    return (
        <div className="col-md-3" key={product.id}>
            <div className="card-prod">
                <div className="image-container">
                    <div className="first">
                        <div className="d-flex justify-content-between align-items-center"> <span className="discount">-15%</span> <span className="wishlist"><i className="fas fa-heart text-danger" /></span> </div>
                    </div> <img src={product.imageUrl} className="img-fluid rounded thumbnail-image" />
                </div>
                <div className="product-detail-container p-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="dress-name">{product.name}</h5>
                        <div className="d-flex flex-column mb-2">
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <Link href={{ pathname: '/category', query: { id: product.category.id } }}>
                            <a><small>Kategori : {product.category.name} </small></a>
                        </Link>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-1">
                        <div> <i className="fas fa-star rating-star text-warning" /> <span className="rating-number">{product.rating}</span> </div> <span className="buy">Rp.{numberWithCommas(product.price)},00</span>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <div className="card voutchers">
                    <div className="voutcher-divider">
                        <div className="voutcher-left text-center"> <span className="voutcher-name">Barang tersedia
                            :</span>
                            <h5 className="voutcher-code">{product.stock} pcs</h5>
                        </div>
                        <div className="voutcher-right text-center border-left">
                            <h3 className="discount-percent mt-2">
                                <Link href={{ pathname: '/product/detail', query: { id: product.id } }}>
                                    <a className="text-white">Detail</a>
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduct