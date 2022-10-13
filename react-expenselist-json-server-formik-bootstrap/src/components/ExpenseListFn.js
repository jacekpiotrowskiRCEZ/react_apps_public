import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Container} from "react-bootstrap";
import MyForm from './MyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ExpenseListFn(){
  const [items, setItems] = useState([{}]);
  const [open, setOpen] = useState(false);
  
  const [nameE,setNameE] = useState();
  const [amountE,setAmountE]=useState();
  const [spendDateE,setSpendDateE]= useState();
  const [categoryE,setCategoryE]=useState();
  const [idE,setIdE]=useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    getItems()
     },[items])
  
  async function getItems()
  {
    const dataDownloaded = await  axios.get("http://localhost:3000/expenselist");
    setItems(dataDownloaded.data);
  }

  function getTotal() {
    let total = 0;
    for (var i = 0; i <items.length ; i++) {
      total += (parseInt(items[i].amount));
    }
    return total;
  }
 

function closeHandle(){
  setOpen(false)
}

  function usun(element)
  {
    let newItems = items.filter(item => item.id !== element)
    setItems(newItems);
    axios.delete("http://localhost:3000/expenselist/"+element);
  }


  function edytuj(eId,eName,eAmount,eSpendDate,eCategory){
   setIdE(eId);
    setNameE(eName);
    setAmountE(eAmount);
setSpendDateE(eSpendDate);
setCategoryE(eCategory);

    setShow(true);

  }

function zatwierdzEdycje(){

  try {
      axios.put(
      "http://localhost:3000/expenselist/" + idE,
      {
        name:nameE,
        amount:parseInt(amountE),
        spendDate:spendDateE,
        category:categoryE,
       
      }
    );
  
  } catch (e) {
    console.log(e);
  }
  setShow(false);
}

  return (
    <>    
      <Container>
        <Row> <Col md={{ span: 8, offset: 1 }} style={{textAlign: "center"}}>
          <h2>Lista Wydatków </h2><h6> <small>Wersja:</small>  React + JSON server + axios + Bootstrap</h6><br/>
          </Col>
          </Row>
          <Row>
          <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nazwa</th><th>Cena</th><th>Data dodania</th><th>Kategoria</th><th>Usuń</th><th>Edytuj</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item)=><tr key={item.id}><td>{item.name}</td><td>{item.amount}</td><td>{item.spendDate}</td>
          <td>{item.category}</td><td>
            <Button variant="danger" size="sm" onClick={()=>(usun(item.id))}>Usuń</Button></td>
            <td>
                <Button variant="info" onClick={()=>(edytuj(item.id,item.name,item.amount,item.spendDate,item.category))}>Edytuj</Button></td>
            </tr>)}
          <tr>
            <td style={{textAlign: "right"}}>Razem:</td>
            <td colSpan="5">{getTotal()}</td>
          </tr>
        </tbody>
      </Table>
      </Row>
      </Container>
      <div>     
        <>
        <Container>
          <Row>
            <Col md={{ span: 12 }}>
        <Button 
        variant="outline-primary"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}        
      >
        Dodaj do listy
      </Button>
      </Col>
      </Row>
      </Container>

      <Collapse in={open}>
        <div id="example-collapse-text">
          <Container>
            <Row><Col>
        <MyForm closeHandle={closeHandle} maxID={items[items.length-1].id}/> 
        </Col>
        </Row>
        </Container>
        </div>
      </Collapse>
     
    </>
      
    </div>
         <>     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Zapisywanie zmian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.EditName">
              <Form.Label>Nazwa:</Form.Label>
              <Form.Control
                type="text"
                placeholder={nameE}
                onChange={(e)=>setNameE(e.target.value)}
                 />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.EditAmount"
            >
              <Form.Label>Cena:</Form.Label>
              <Form.Control type="number"
              placeholder={amountE}
              onChange={(e)=>setAmountE(e.target.value)}
              />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.EditCategory"
            >
              <Form.Label>Kategoria:</Form.Label>
              <Form.Control type="text"
              placeholder={categoryE}
              onChange={(e)=>setCategoryE(e.target.value)}/>
            </Form.Group>

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
          <Button variant="primary" onClick={()=>zatwierdzEdycje()}>
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
   </>
  );
}
export default ExpenseListFn;
