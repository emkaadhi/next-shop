// import '../../styles/globals.css'
// import '../../styles/main.css'
import '../../styles/custom.css'
import '../../styles/util.css'
import { Provider } from 'react-redux'
import { store } from '../store'
import Navbar from '../components/main-components/Navbar'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import Footer from '../components/main-components/Footer'

function MyApp({ Component, pageProps }) {
  
  const noAuth = ['/', '/auth/login', '/auth/register', '/product', '/product/detail','/category']

  const router = useRouter()

  return (
    <>
      <Provider store={store}>
        <Navbar />
        {
          noAuth.includes(router.pathname) ? (
            <>
              <Component {...pageProps} />
            </>
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )
        }
        <Footer/>
      </Provider>
    </>
  )

}

export default MyApp
