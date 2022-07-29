import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { db } from '../../config/firebase'
import { get_latest_order } from '../../store/order/OrderSlice'
import { numberWithCommas } from '../../utils/constant'

const Checkout = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [orderId, setOrderId] = useState('')
  const [date, setDate] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [orders, setOrders] = useState([])

  const fecthOrder = () => {
    const q = query(collection(db, "orders"), orderBy("date", "desc"), limit(1))
    getDocs(q)
      .then((Snapshot) => {
        let latest = []
        Snapshot.docs.forEach((doc) => {
          latest.push({ ...doc.data(), id: doc.id })
          setName(latest[0].customer.username)
          setAddress(latest[0].customer.address)
          setPhone(latest[0].customer.phone)
          setOrderId(latest[0].id)
          setTotalAmount(latest[0].total_amount)
          setOrders(latest[0].order)
          setDate(latest[0].date)
        })
        console.log(latest[0]);
      })
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    fecthOrder()
  }, [])

  const OngkosKirim = 25000


  return (
    <>
      <div className="container">
        <div className="row p-5">
          <div className="invoice p-3 mb-3">
            {/* title row */}
            <div className="row">
              <div className="col-12 mb-3">
                <h4>
                  <img src="./img/tokologorm.png" alt="" style={{width:'75px'}}/>
                  {/* <small className="float-right">Date: {moment(date?.toDate()).calendar()}</small> */}
                </h4>
              </div>
              {/* /.col */}
            </div>
            {/* info row */}
            <div className="row invoice-info">
              <div className="col-sm-4 invoice-col">
                Dari
                <address>
                  <strong>Toko Kita Online Store</strong><br />
                  Jalan perdatam no 5<br />
                  Surakarta , Jawa Tengah<br />
                  Phone: (021) 123-XXXX<br />
                  Email: info@tokokita.com
                </address>
              </div>
              {/* /.col */}
              <div className="col-sm-4 invoice-col">
                Ke
                <address>
                  <strong className=''>Tn/Ny : {name}</strong><br />
                  {address}<br />
                  Phone: {phone}<br />
                </address>
              </div>
              {/* /.col */}
              <div className="col-sm-4 invoice-col">
                <b>Order ID:</b>ORD - {orderId}<br />
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            {/* Table row */}
            <div className="row">
              <div className="col-12 table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Qty</th>
                      <th>Product</th>
                      <th>Harga</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders && orders.map((order) => {
                        return (
                          <tr key={order.id}>
                            <td>{order.amount}</td>
                            <td>{order.product.name}</td>
                            <td>Rp.{numberWithCommas(order.product.price)},00</td>
                            <td>Rp.{numberWithCommas(order.price_amount)},00</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            <div className="row mt-5">
              {/* accepted payments column */}
              <div className="col-6">
                <p className="lead">Pembayaran dapat dilakukan di :</p>
                <img src="/img/mandiri.png" alt="Mandiri" style={{ width: '70px' }} />
                <img src="/img/bri.png" alt="BRI" style={{ width: '70px' }} />
                <img src="/img/gopay.png" alt="Gopay" style={{ width: '70px' }} />
                <img src="/img/ovo.png" alt="Paypal" style={{ width: '70px' }} />
                <p className="text-muted well well-sm shadow-none" style={{ marginTop: 10 }}>
                  <small>
                    Dalam 1 X24 Jam Customer Service kami akan menghubungi anda , Jika dalam 2 hari setelah order
                    anda belum melaksanakan pembayaran maka kami anggap order anda kami batalkan.
                  </small>
                </p>
                <p className="text-muted well well-sm shadow-none" style={{ marginTop: 10 }}>
                  <small>
                    Demikian untuk menjadikan pemberitahuan
                  </small>
                </p>
              </div>
              {/* /.col */}
              <div className="col-6">
                <p className="lead">Jumlah yang harus dibayar :</p>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th style={{ width: '50%' }}>Subtotal:</th>
                        <td>Rp.{numberWithCommas(totalAmount)},00</td>
                      </tr>
                      <tr>
                        <th>Ongkos Kirim:</th>
                        <td>Rp.{numberWithCommas(OngkosKirim)},00</td>
                      </tr>
                      <tr>
                        <th>Total:</th>
                        <td>Rp.{numberWithCommas(totalAmount+OngkosKirim)},00</td>
                      </tr>
                    </tbody></table>
                </div>
              </div>
              {/* /.col */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout