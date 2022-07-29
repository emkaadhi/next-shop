import { createSlice } from '@reduxjs/toolkit'
import { addDoc, collection,getDocs, limit, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import { db } from '../../config/firebase'

export const add_order = (data) => {
    return (dispatch) => {
        const dbRef = collection(db, 'orders')
        let orders = {
            total_amount:data.totalPrice,
            date:serverTimestamp(),
            order:data.carts,
            customer:data.customer
        }
        addDoc(dbRef,orders)
        .then(()=>{
            dispatch(addOrder(orders))
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
}

export const get_latest_order =  ()=>{
    return (dispatch)=>{
        const q =  query(collection(db,'orders'),orderBy('date','desc'),limit(1))
        getDocs(q)
        .then((Snapshot)=>{
            let latest = []
            Snapshot.docs.forEach((doc)=>{
                latest.push({...doc.data(),id:doc.id})
                dispatch(getLatestOrder(latest))
            })
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
}



const initialState = {
    orders:[],
    isAddOrder:true,
    latestOrder:[],
    isLoadingLatestOrder:true
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder(state,action){
            state.orders = action.payload
            state.isAddOrder = false
        },
        getLatestOrder(state,action){
            state.latestOrder = action.payload
            state.isLoadingLatestOrder = false
        },
    },
});

export const { addOrder,getLatestOrder} = orderSlice.actions;
export default orderSlice.reducer;
