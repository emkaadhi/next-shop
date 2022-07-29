import { createSlice } from '@reduxjs/toolkit'
import { collection,doc,getDoc,getDocs, query, where} from 'firebase/firestore'
import { db } from '../../config/firebase'

export const get_products = () => {
    return (dispatch) => {
        const dbRef = collection(db, 'products')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                dispatch(productData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const get_single_product = (id)=>{
    return async (dispatch)=>{
        const fetchData = async () => {
            const docRef = doc(db, 'products', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              dispatch(singleData({...docSnap.data(),id:docSnap.id}));
            }
          };
          fetchData();
    }
}

export const get_trending = () => {
    return (dispatch) => {
        const q = query(collection(db, "products"),where('trending','==',1))
        getDocs(q)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                dispatch(trendingData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const initialState = {
    products:[],
    trending:[],
    isLoadingProducts:true,
    isLoadingTrending:true,
    single:[],
    isLoadingSingle:true
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productData(state,action){
            state.products = action.payload
            state.isLoadingProducts = false
        },
        trendingData(state,action){
            state.trending = action.payload
            state.isLoadingTrending = false
        },
        singleData(state,action){
            state.single = action.payload
            state.isLoadingSingle = false
        },
        
    },
});

export const { productData,trendingData,singleData} = productSlice.actions;
export default productSlice.reducer;
