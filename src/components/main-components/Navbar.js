import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../config/firebase';
import { login } from '../../store/user/UserSlice';
import NavbarMain from './NavbarMain'
import NavbarTop from './NavbarTop'

const Navbar = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );
      }
    });
  }, [dispatch]);
  return (
    <>
      <NavbarMain />
    </>
  )
}

export default Navbar