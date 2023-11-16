import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../store.js";

let YellowBtn = styled.button`
    background : yellow;
    color : black;
    padding : 10px;
`


export default function Detail(props){

    let [timer, setTimer] = useState(true);
    let [count, setCount] = useState(0);
    let [countAlert, setCountAlert] = useState(false);
    let [tab, setTab] = useState(0);

   

    useEffect( () => {
        // mount, update시 실행
        setTimeout( () => {
            setTimer(false)
        }, 2000)
    })

    useEffect( () => {
        console.log(Number.isInteger(count))
        if(isNaN(count)){
            setCountAlert(true);
            setTimeout( () => {setCountAlert(false)}, 1000);
            setCount(count.replace(/[^0-9.]/g, '').replace(/(\..*)\./g));
        }
    }, [count])

    let {id} = useParams();
    let item = props.shoes.find( v => v.id == id);

    let dispatch = useDispatch();

     // 최근 본 상품 정리
     useEffect( () => {
        if(!localStorage.getItem("watched")){
            localStorage.setItem("watched", JSON.stringify([]))
        }
        let watched = JSON.parse(localStorage.getItem("watched"));
        watched.push(id)
        watched = [...new Set(watched)]
        localStorage.setItem("watched", JSON.stringify(watched))
    }, [])




    return (
        <div className="container">
            {timer && <div className="alert alert-warning">2초이내 구매시 할인</div>}
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${Number(id)+1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                    {countAlert && <div className="alert alert-danger">그러지 마세요</div>}
                    <input type="text" value={count} title="수량" onChange={(e) => {setCount(e.target.value)}}/>
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem(item))
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={ () => setTab(0)}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={ () => setTab(1)}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={ () => setTab(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab ={tab} item={item}/>
        </div> 
    );
}

function TabContent({tab,item}){
    // let html = "";
    // if(tab === 0){
    //     html = <div>내용0</div>
    // }else if(tab === 1){
    //     html = <div>내용1</div>
    // }else if(tab === 2){
    //     html = <div>내용2</div>
    // }
    // return html;

    let [fade, setFade] = useState('');

    useEffect(()=> {
        setTimeout( () => {
            setFade('end');
        }, 100)

        return () => {
            setFade('')
        }
    }, [tab])

    return (
        <div className={'start ' + fade}>
            { [<div>내용0 { item.title }</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
    )
}