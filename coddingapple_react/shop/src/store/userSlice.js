import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},

    // 수정함수 선언
    reducers : {
        chanegeName(state){
            state.name = 'park'
        },
        addAge(state, action){
            state.age += action.payload
        },
    }
})
export let {chanegeName, addAge } = user.actions

export default user