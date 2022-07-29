import { createSlice } from '@reduxjs/toolkit'
import { doc, getDoc,updateDoc} from 'firebase/firestore'
import { db } from '../../config/firebase'

export const get_profile_data = (id) => {
    return async (dispatch) => {
      const fetchData = async () => {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(profileData({...docSnap.data(),id:docSnap.id}));
        }
      };
      fetchData();
    };
  };

  
  export const update_profile_data = (data) => {
    return (dispatch) => {
      const userUpdateRef = doc(db, 'users', data.id)
      let updateUser = {
        id: data.id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        avatar: data.avatar,
      }
      updateDoc(userUpdateRef, updateUser)
        .then(() => {
          dispatch(updateProfileData(updateUser))
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

const initialState = {
    profile:'',
    isLoadingProfile:true,
    updateProfile:'',
    isLoadingUpdateProfile:true
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileData(state,action){
            state.profile = action.payload
            state.isLoadingProfile = false
        },
        updateProfileData(state,action){
            state.updateProfile = action.payload
            state.isLoadingUpdateProfile = false
        },
    },
});

export const { profileData ,updateProfileData} = profileSlice.actions;
export default profileSlice.reducer;
