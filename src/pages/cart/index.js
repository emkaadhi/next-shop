import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import Modal from '../../components/cart-components/Modal'
import Process from '../../components/cart-components/Process'
import { delete_cart, get_carts } from '../../store/cart/CartSlice'
import { numberWithCommas } from '../../utils/constant'

const ShoopingCart = () => {

    const dispatch = useDispatch()

    const carts = useSelector((state) => state.cart.carts)
    const loading = useSelector((state) => state.cart.isLoadingCart)

    useEffect(() => {
        dispatch(get_carts())
    }, [dispatch])

    const [cart, setCart] = useState(false)
    const [amount, setAmount] = useState(0)
    const [priceAmount, setPriceAmount] = useState(0)

    const onClick = (cart) => {
        setCart(cart)
        setAmount(cart.amount)
        setPriceAmount(cart.price_amount)
    }

    const orderPlus = () => {
        setAmount(amount + 1)
        setPriceAmount(cart.product.price * (amount + 1))
        dispatch(get_carts())
    }

    const orderMinus = () => {
        if (amount !== 1) {
            setAmount(amount - 1)
            setPriceAmount(cart.product.price * (amount - 1))
        }
        dispatch(get_carts())
    }

    const cancelOrder = (id) => {
        if (id) {
            dispatch(delete_cart(id))
            dispatch(get_carts())
        }
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `order di hapuskan dari keranjang belanja!`,
            showConfirmButton: false,
            timer: 2500
        })
    }

    const totalPrice = (carts || '').reduce((a, b) => {
        return a + b.price_amount
    }, 0)

    useEffect(() => {
        totalPrice
    }, [])

    return (
        <>
            <div className="p-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 p-5">
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }}>
                                            Image
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Produk
                                        </th>
                                        <th>
                                            Harga
                                        </th>
                                        <th>
                                            Jumlah
                                        </th>
                                        <th style={{ width: '20%' }} className="text-center">
                                            Total Harga
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        carts && carts.map((cart) => {
                                            return (
                                                <tr key={cart.id}>
                                                    <td>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item">
                                                                <img alt="Avatar" className="img-thumbnail" src={cart.product.imageUrl} style={{ width: '75px' }} />
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <h5 className='text-uppercase'>
                                                            {cart.product.name}
                                                        </h5>
                                                        <small>
                                                            Kategory : {cart.product.category.name}
                                                        </small>
                                                    </td>
                                                    <td className="project_progress">
                                                        Rp.{numberWithCommas(cart.product.price)},00
                                                    </td>
                                                    <td className="project-state">
                                                        {cart.amount}
                                                    </td>
                                                    <td className="project-state">
                                                        Rp.{numberWithCommas(cart.price_amount)},00
                                                    </td>
                                                    <td className="project-actions">
                                                        <button
                                                            data-toggle="modal" data-target="#exampleModal" onClick={() => onClick(cart)}
                                                            className="btn btn-info btn-sm btn-flat mr-2">
                                                            <i className="fas fa-pencil-alt mr-1">
                                                            </i>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-danger btn-sm btn-flat" onClick={() => cancelOrder(cart.id)}>
                                                            <i className="fas fa-trash mr-1">
                                                            </i>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Modal
                                cart={cart}
                                amount={amount}
                                priceAmount={priceAmount}
                                orderMinus={orderMinus}
                                orderPlus={orderPlus}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <Process
                    carts={carts}
                    totalPrice={totalPrice}
                />
            </div>
        </>
    )
}

export default ShoopingCart