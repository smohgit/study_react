/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  // 스테이트
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
  // let [like, setLike] = useState([0,0,0]);
  let initLike = []
  글제목.forEach ( () => {
    initLike.push(0)
  })
  let [like, setLike] = useState(initLike);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');


  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={ {color : 'red', fontSize : '20px' } }>ReactBlog</h4>
      </div>
      <button onClick={() => {
        let copy = [...글제목];
        copy[0] = '여자코트 추천';
        글제목변경(copy);
      }}>첫번째 글 제목 변경</button>
      <button onClick={() => {
        let copy = [...글제목];
        copy.sort()
        글제목변경(copy);
      }}>정렬</button>


      {
        글제목.map( (v, i) => {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => {setTitle(i); setModal(true);} }>{v} <span onClick={ e => {
                e.stopPropagation();
                let copy = [...like]
                copy[i]++;
                setLike(copy);
              }}>👍</span> {like[i]} </h4> 
              <button onClick={ () => {
                console.log(i)
                let copy = [...글제목];
                copy.splice(i, 1)
                글제목변경(copy);
              }}>삭제</button>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }

      <input type='searchß' onChange={ e => { 
        입력값변경(e.target.value);  }} value={입력값}
        />
      <button onClick={ () => {
        글제목변경([입력값, ...글제목]);
        setLike([0, ...like])
        입력값변경(""); 
      }}>추가</button>


      {modal && <Modal 글제목={글제목[title]} 글제목변경={글제목변경}/>} 
    </div>
  );
}

function Modal(props){
  return(
    <div className="modal">
      <h4>{props.글제목}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ () => {
        props.글제목변경(['여자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
      }}>글수정</button>
    </div>
  )
} 

export default App;
