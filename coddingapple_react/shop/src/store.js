import { configureStore, createSlice } from '@reduxjs/toolkit'

/*  일반 문자열인 경우 */
// let user = createSlice({
//     name : 'user',
//     initialState : 'kim',

//     // 수정함수 선언
//     reducers : {
//         chanegeName(state){
//             return 'john ' + state
//         },
        
//     }
// })
// export let {chanegeName } = user.actions

/* object 형인경우 */
// let user = createSlice({
//     name : 'user',
//     initialState : {name : 'kim', age : 20},

//     // 수정함수 선언
//     reducers : {
//         chanegeName(state){
//             state.name = 'park'
//         },
//         addAge(state, action){
//             state.age += action.payload
//         },
//     }
// })
// export let {chanegeName, addAge } = user.actions

/* import */
import user from './store/userSlice.js'


let cartItem = createSlice({
    name : 'cartItem',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            state.find( v => v.id === action.payload).count += 1
        },
        addItem(state, action){
            let orgItem = state.find( v => v.id === action.payload.id)
            if(orgItem){
                orgItem.count += 1
            }else{
                let newItem = {
                    id : action.payload.id,
                    name : action.payload.title,
                    count : 1
                }
                state.push(newItem)
            }
        },
    }
})
export let { addCount, addItem } = cartItem.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    cartItem : cartItem.reducer,
  }
}) 