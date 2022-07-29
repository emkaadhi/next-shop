import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { db } from '../../config/firebase'
import { get_carts } from '../../store/cart/CartSlice'
import { add_order } from '../../store/order/OrderSlice'
import { get_profile_data } from '../../store/profile/profileSlice'
import { selectUser } from '../../store/user/UserSlice'
import { numberWithCommas } from '../../utils/constant'


const Process = ({ carts, totalPrice }) => {

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')

    const user = useSelector(selectUser)
    const profile = useSelector((state) => state.profile.profile)

    const id = user?.uid
    const username = profile.username

    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        if (user) {
            dispatch(get_profile_data(id))
        }
    }, [dispatch, id])

    const ongkir = 25000

    if (!profile) {
        <p>Loading...</p>
    }

    const onSubmit = (totalPrice) => {
        if (carts.length === 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `Belum ada pesanan di keranjang!`,
                showConfirmButton: false,
                timer: 2500
            })
            router.push('/')
        }  else if 
            ( firstName === '' && address ==='' && phone ==='' ) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Lengkapi data pelanggan anda!`,
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        else {
            let customer = {
                id,
                username,
                firstName,
                lastName,
                phone,
                address
            }
            dispatch(add_order({ totalPrice, carts, customer }))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Purchase success!`,
                showConfirmButton: false,
                timer: 2500
            })
            carts.map((e) => {
                const dbRef = doc(db, 'carts', e.id)
                deleteDoc(dbRef)
            })
            router.push('/checkout')
            dispatch(get_carts())
        }

    }

    return (
        <>
            <div className="row">
                <div className="col-md-7">
                    <h4 className="mb-3">Data Pelanggan</h4>
                    <form className="">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Nama Depan</label>
                                <input type="text" className="form-control" name="firstName" required placeholder='isi nama depan...'  onChange={(e)=>setFirstName(e.target.value)}/>
                                <small id="helpId" class="form-text text-muted">* wajib diisi</small>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Nama Belakang</label>
                                <input type="text" className="form-control" name="lastName" placeholder='isi nama belakang...'  onChange={(e)=>setLastName(e.target.value)}/>
                                <small id="helpId" class="form-text text-muted">* opsional</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-7 mb-3">
                                <label htmlFor="firstName">No Telephone</label>
                                <input type="text" className="form-control" name="phone" required placeholder='isi telephone/no hp yang bisa dihubungi...'  onChange={(e)=>setPhone(e.target.value)}/>
                                <small id="helpId" class="form-text text-muted">* wajib diisi</small>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">Alamat</label>
                            <input type="text" className="form-control" name="address" placeholder="isi alamat lengkap..." required  onChange={(e)=>setAddress(e.target.value)}/>
                            <small id="helpId" class="form-text text-muted">* berikan alamat lengkap anda beserta kode pos</small>
                        </div>
                    </form>
                </div>
                <div className="col-md-5">
                    <div className="p-4">
                        <p className="font-italic mb-4">Pengiriman akan menyesuaikan sesuai order dari pelanggan</p>
                        <ul className="list-unstyled mb-4">
                            <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>Rp.{numberWithCommas(totalPrice)},00</strong></li>
                            {
                                carts.length !== 0 && (
                                    <>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>Rp.{numberWithCommas(ongkir)},00</strong></li>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                            <h5 className="font-weight-bold">Rp.{numberWithCommas(totalPrice + ongkir)},00</h5>
                                        </li>
                                    </>
                                )
                            }
                        </ul><button type='submit' onClick={() => onSubmit(totalPrice)} className="btn bg-purple rounded-pill mt-2 btn-block"><b>Proses Checkout</b></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Process