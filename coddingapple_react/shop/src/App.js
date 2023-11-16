import { Suspense, lazy, useState } from 'react';
import './App.css';
import {Button, Navbar, Container, Nav, Spinner} from 'react-bootstrap'
import data from './data.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query';

// import Cart from './routes/Cart.js'
// import Detail from './routes/Detail.js'

const Detail = lazy( () => import('./routes/Detail.js'));
const Cart = lazy( () => import('./routes/Cart.js'));

function App() {

  let [shoes, setShoes] = useState(data);
  let [moreCount, setMoreCount] = useState(2);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let result = useQuery('작명', () =>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{ 
      console.log('이름 요청')
      return a.data 
    })
  )

  return (
    <div className="App">

       <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">react쇼핑몰</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#" onClick={() => navigate('/')}>Home</Nav.Link>
          <Nav.Link href="#features" onClick={() => navigate('/cart')}>Cart</Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          { result.isLoading ? '로딩중' : result.data.name}
        </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중임</div>}>
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'>
              최근 본 상품 id : {JSON.parse(localStorage.getItem('watched')).join(", ")}
            </div> 

            {/***************************************************************************/}
            {/********************************** 상품목록 *********************************/}
            {/***************************************************************************/}
            <div className="container">
              <div className="row">
              {shoes.map( (v, i) => <Card data={v} key={i} navigate={navigate}/>)}
              </div>
            </div> 
            {moreCount < 4 &&
              <button onClick={ () => {
                setLoading(true);
                axios.get(`https://codingapple1.github.io/shop/data${moreCount}.json`).then((result)=>{
                  setShoes(shoes.concat(result.data))
                  setMoreCount(++moreCount);
                  // console.log(result.data)
                }).catch(()=>{
                  console.log('실패함')
                }).then(()=> setLoading(false))
              }}>더보기</button>
            }
            {loading && <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
          </>
        }/>
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="*" element={<div>없는 페이지~</div>}/> { /* 외 모든 페이지 */}
      </Routes>1
      </Suspense>
    </div>
  );
}


function Card(props){
  return (
    <div className="col-md-4">
      {/* <img src={'https://codingapple1.github.io/shop/shoes' + (props.data.id+1) + '.jpg'} width="80%" /> */}
      <img src={`https://codingapple1.github.io/shop/shoes${props.data.id + 1}.jpg`} width="80%" 
        onClick={ () => props.navigate('/detail/' + props.data.id)}  alt="shoes"/>
      <h4>{props.data.title}</h4>
      <p>{props.data.content}</p>
    </div>
  )
}


export default App;
