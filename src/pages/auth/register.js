import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import _default from 'next/dist/client/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { auth, db } from '../../config/firebase'
import { login, register } from '../../store/user/UserSlice'

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      setDoc(doc(db, 'users', user.uid), {
        username: name,
        first_name: '',
        last_name: '',
        email,
        address: '',
        phone: '',
        avatar: '',
        role: 0,
        createdAt: serverTimestamp()
      })
      router.push('/')
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Register Berhasil!`,
        showConfirmButton: false,
        timer: 2500
      })
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 2500
      })
    }
  }

  return (
    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="card card0 border-0">
        <div className="row d-flex">
          <div className="col-lg-6">
            <div className="card1 p-3">
              <img src="https://images.unsplash.com/photo-1585144860131-245d551c77f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=604&q=80" width="100%" />
            </div>
          </div>
          <div className="col-lg-6 p-2">
            <div className="card2 card border-0 px-4 py-5">
              <div className="row mb-4 px-3">
                <h6 className="mb-0 mr-4 mt-2">Login with</h6>
                <div className="facebook text-center mr-3">
                  <i className="fab fa-google" />
                </div>
                <div className="twitter text-center mr-3">
                  <i className="fab fa-facebook-f" />
                </div>
              </div>
              <div className="row px-3 mb-4">
                <div className="line" />
                <small className="or text-center">Or</small>
                <div className="line" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row px-3">
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Name</h6>
                  </label>
                  <input className="mb-4" type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="Enter a valid name" />
                </div>
                <div className="row px-3">
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Email Address</h6>
                  </label>
                  <input className="mb-4" type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter a valid email address" />
                </div>
                <div className="row px-3">
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Password</h6>
                  </label>
                  <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <div className="row mb-3 px-3 mt-2">
                  <button type="submit" className="btn bg-purple btn-block text-center"><b>Register</b></button>
                </div>
              </form>
              <div className="row mb-4 px-3">
                <Link href={`/auth/login`}>
                  <small className="font-weight-bold">Sudah Mendaftar Membership ? <a className="text-info">Login</a></small>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-purple py-4">
          <div className="row px-3">
            <small className="ml-4 ml-sm-5 mb-2">Copyright © 2022. All rights reserved.</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register