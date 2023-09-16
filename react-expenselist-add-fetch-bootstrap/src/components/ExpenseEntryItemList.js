import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
//import Collapse from 'react-bootstrap/Collapse';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
//import Modal from 'react-bootstrap/Modal';

//import data from "../db/lista";

const ExpenseEntryItemList = () => {
  const [items, setItems] = useState([]);
  //const [nazwa, setNazwa] = useState();
  const [pObiekt, setpObiekt] = useState({
    pNazwa: "",
    pCena: 0,
    pKategoria: ""
  });

  //const [open, setOpen] = useState(false);
  const getData = () => {
    // Fetch Function
    fetch("./lista.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (items) {
        // store Data in State Data Variable
        setItems(items);
      })
      .catch(function (err) {
        console.log(err, "error");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  function getTotal() {
    let total = 0;
    for (var i = 0; i < items.length; i++) {
      total += parseInt(items[i].amount);
    }
    return total;
  }

  function usun(element) {
    let newItems = items.filter((item) => item.id !== element);
    setItems(newItems);
  }
  /*function wyswietlNazwe(element) {
    setNazwa(element);
    console.log(element);
  }*/

  function addItem() {
    let maxID;
    if (items[0] == null) {
      maxID = 0;
    } else {
      maxID = items[0].id;
    }
    for (var i = 0; i < items.length; i++) {
      console.log(items[i].id + "  _  ");
      if (maxID < items[i].id) maxID = items[i].id;
    }
    maxID++;
    console.log(maxID);

    let data = new Date();
    let nowaData =
      data.getFullYear() + "-" + data.getMonth() + "-" + data.getDay();

    let newItem = pObiekt.pNazwa;
    let newAmount = pObiekt.pCena;
    let newCategory = pObiekt.pKategoria;

    let myItem = {
      id: maxID,
      name: newItem,
      amount: newAmount,
      spendDate: nowaData,
      category: newCategory
    };
    console.log(myItem);
    console.log(items);
    setItems([...items, myItem]);
  }

  return (
    <>
      <Container>
        <Row>
          {" "}
          <Col md={{ span: 8, offset: 1 }} style={{ textAlign: "center" }}>
            <h2>Lista Wydatków </h2>
            <h6>
              {" "}
              <small>Wersja:</small> React + fetch + Bootstrap
            </h6>
            <br />
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Cena</th>
                <th>Data dodania</th>
                <th>Kategoria</th>
                <th>Usuń</th>
                <th>Edytuj</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.spendDate}</td>
                  <td>{item.category}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => usun(item.id)}
                    >
                      Usuń
                    </Button>
                  </td>
                  <td></td>
                </tr>
              ))}
              <tr>
                <td style={{ textAlign: "right" }}>Razem:</td>
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
              <Col md={{ span: 12 }}></Col>
            </Row>
          </Container>
        </>
      </div>
      <>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.EditName">
            <Form.Label>Nazwa:</Form.Label>
            <Form.Control
              type="text"
              placeholder={pObiekt.pNazwa}
              onChange={(e) =>
                setpObiekt({ ...pObiekt, pNazwa: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.EditAmount">
            <Form.Label>Cena:</Form.Label>
            <Form.Control
              type="number"
              placeholder={pObiekt.pCena}
              onChange={(e) =>
                setpObiekt({ ...pObiekt, pCena: e.target.value })
              }
            />
            <Form.Group className="mb-3" controlId="exampleForm.EditCategory">
              <Form.Label>Kategoria:</Form.Label>
              <Form.Control
                type="text"
                placeholder={pObiekt.pKategoria}
                onChange={(e) =>
                  setpObiekt({ ...pObiekt, pKategoria: e.target.value })
                }
              />
              <br />
            </Form.Group>
          </Form.Group>
        </Form>

        <Button variant="primary" onClick={() => addItem()}>
          Dodaj do listy
        </Button>
      </>
    </>
  );
};

export default ExpenseEntryItemList;
