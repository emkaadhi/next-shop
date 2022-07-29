import { createSlice } from '@reduxjs/toolkit'
import { collection,getDocs, query, where} from 'firebase/firestore'
import { db } from '../../config/firebase'

export const get_categories = () => {
    return (dispatch) => {
        const dbRef = collection(db, 'categories')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                dispatch(categoryData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const get_product_category = (id)=>{
    return (dispatch) => {
        const q = query(collection(db, "products"),where('category.id','==',id))
        getDocs(q)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                dispatch(productCategory(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const initialState = {
    categories:[],
    isLoadingCategory:true,
    product_category:[],
    isLoadingProductCategory:true
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        categoryData(state,action){
            state.category = action.payload
            state.isLoadingCategory = false
        },
        productCategory(state,action){
            state.product_category = action.payload
            state.isLoadingProductCategory = false
        },
        
    },
});

export const { categoryData,productCategory} = categorySlice.actions;
export default categorySlice.reducer;
