import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { login } from '../../store/user/UserSlice'
import Swal from 'sweetalert2'
import {useDispatch} from 'react-redux'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(
          login({
            email: user.user?.email,
            uid: user.user?.uid,
          })
        );
        router.push('/')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Login Berhasil`,
          showConfirmButton: false,
          timer: 2500
        })
      })
      .catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 2500
        })
      });
  }

  return (
    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="card card0 border-0">
        <div className="row d-flex">
          <div className="col-lg-6">
            <div className="card1 p-3">
              <img src="https://images.unsplash.com/photo-1585144860106-998ca0f2922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=604&q=80" width="100%" />
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
                    <h6 className="mb-0 text-sm">Email Address</h6>
                  </label>
                  <input className="mb-4" type="text" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter a valid email address" />
                </div>
                <div className="row px-3">
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Password</h6>
                  </label>
                  <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <div className="row mb-3 px-3 mt-5">
                  <button type="submit" className="btn bg-purple btn-block text-center"><b>Login</b></button>
                </div>
              </form>
              <div className="row mb-4 px-3">
                <Link href={`/auth/register`}>
                  <small className="font-weight-bold">Belum mendaftar Membership ? <a className="text-info">Register</a></small>
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

export default Login