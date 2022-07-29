import { createSlice } from '@reduxjs/toolkit'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'

export const get_carts = () => {
    return (dispatch) => {
        const dbRef = collection(db, 'carts')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                dispatch(cartData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const add_cart = (value) => {
    return (dispatch) => {
        const dbCart = collection(db, 'carts')
        const q = query(collection(db, 'carts'), where('product.id', '==', value.id))
        getDocs(q)
            .then((Snapshot) => {
                let currentProduct = []
                Snapshot.docs.forEach((doc) => {
                    currentProduct.push({ ...doc.data(), id: doc.id })
                })

                if (currentProduct.length === 0) {
                    let cart = {
                        amount: 1,
                        price_amount: value.price,
                        product: value
                    }
                    addDoc(dbCart, cart)
                    dispatch(addCartData(cart))
                } else {
                    const updateCart = doc(db, 'carts', currentProduct[0].id)
                    const cart = {
                        amount: currentProduct[0].amount + 1,
                        price_amount: currentProduct[0].price_amount + value.price,
                        product: value
                    }
                    updateDoc(updateCart, cart)
                    dispatch(addCartData(cart))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const update_cart = (data) => {
    return (dispatch) => {
        const cartUpdateRef = doc(db, 'carts', data.id)
        let updateCart = {
            id:data.id,
            amount: data.amount,
            price_amount: data.priceAmount,
        }
        updateDoc(cartUpdateRef, updateCart)
            .then(() => {
                dispatch(updateCartData(updateCart))
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const delete_cart = (id)=>{
    return (dispatch)=>{
        const cartRef =  doc(db,'carts',id)
        deleteDoc(cartRef)
        .then(()=>{
            dispatch(deleteCartData,cartRef)
        })
        .catch((err)=>console.log(err.message))
    }
}


const initialState = {
    amount: 0,
    price_amount: 0,
    carts: [],
    isLoadingCart: true,
    addCart: [],
    isLoadingAddCart: true,
    updateCart:''
}

export const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        cartData(state, action) {
            state.carts = action.payload
            state.isLoadingCart = false
        },
        addCartData(state, action) {
            state.addCart = action.payload
            state.isLoadingAddCart = false
        },
        updateCartData(state, action) {
            state.updateCart = action.payload
        },
        deleteCartData(state, action) {
            state.deleteCart = action.payload
        },
        
    },
});

export const { cartData, addCartData ,updateCartData,deleteCartData} = cartSlice.actions;
export default cartSlice.reducer;
