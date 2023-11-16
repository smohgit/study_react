import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { chanegeName, addAge } from '../store/userSlice.js'
import { addCount } from '../store.js'
import { memo, useState } from 'react'


let Child = memo( function(){
    console.log('재렌더링됨')
    return <div>자식임</div>
})  


function Cart(){

    let state = useSelector((state) => state)
    let dispatch = useDispatch()

    // 재렌더링 테스트용
    let [count, setCount] = useState(0);


    return (
        <div>
            
            <Child />
            <button onClick={() => setCount(count++)}>+</button>

            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={ () => {dispatch(addAge(10))}}>나이 더먹기~</button>

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cartItem.map( v => {
                            return (
                                <tr key={v.id}>
                                    <td>{v.id}</td>
                                    <td>{v.name}</td>
                                    <td>{v.count}</td>
                                    <td><button onClick={ () => {
                                        dispatch(addCount(v.id))
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart