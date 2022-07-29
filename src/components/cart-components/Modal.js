import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { get_carts, updateCartData, update_cart } from '../../store/cart/CartSlice'
import { numberWithCommas } from '../../utils/constant'

const Modal = (
    {
        cart,
        amount,
        priceAmount,
        orderMinus,
        orderPlus
    }

) => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        let id = cart.id
        dispatch(update_cart({ id, amount, priceAmount }))
        dispatch(get_carts())
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Update ${cart.product.name} sukses!`,
            showConfirmButton: false,
            timer: 2500
        })
    }
    if (cart) {
        return (
            <>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-dark">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Pemesanan</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="card bg-light d-flex flex-fill">
                                        <div className="card-body p-4">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h2 className="lead text-uppercase"><b>{cart.product.name}</b></h2>
                                                    <p className=" text-sm my-3"><b>Harga Satuan : </b> Rp.{numberWithCommas(cart.product.price)},00 </p>
                                                    <p className=" text-sm my-3"><b>Harga Sub Total : </b> Rp.{numberWithCommas(priceAmount)},00 </p>
                                                    <div className="form-group">
                                                        <a className='ml-3 btn' onClick={() => orderPlus()}><i className="fas fa-plus-circle"></i></a>
                                                        <strong>{amount}</strong>
                                                        <a className='mr-3 btn' onClick={() => orderMinus()}><i className="fas fa-minus-circle"></i></a>
                                                        <small id="helpId" className="form-text text-muted ml-3">*edit jumlah order anda disini</small>
                                                    </div>
                                                </div>
                                                <div className="col-5 text-center p-2">
                                                    <img src={cart.product.imageUrl} alt="user-avatar" className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="text-right">
                                                <button type='submit' className="btn btn-sm bg-teal mr-2">
                                                    <i className="fas fa-save mr-1" /> Simpan Perubahan
                                                </button>
                                                <button className="btn btn-sm btn-primary" data-dismiss="modal">
                                                    <i class="fas fa-arrow-circle-right mr-1"></i> Kembali ke keranjang belanja
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Modal