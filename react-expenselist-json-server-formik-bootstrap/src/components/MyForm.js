import axios from 'axios';
import { useState } from 'react';
import { Row, Col, Container,Button} from "react-bootstrap";
import { Formik, Form} from "formik";
import MyInput from "./MyInput";
import * as Yup from "yup";


function MyForm({maxID,closeHandle}){
    const [items, setItems] = useState([]);

    function addItem()
    {
      
      maxID++;
      let now = new Date().toLocaleDateString();
      let newName= document.formularz.fName.value;
      let newAmount = document.formularz.fAmount.value;
      let newCategory = document.formularz.fCategory.value;
  
      let newItem = {id: maxID, name: newName , amount: newAmount, spendDate: now ,category: newCategory}
      setItems([...items, newItem]);
      axios.post("http://localhost:3000/expenselist", newItem);
      closeHandle()
    }


return(
<div id="dForm">
          <br />

          <Formik
            initialValues={{
              fName: "",
              fAmount: 0,
              fCategory: ""
            }}
            validationSchema={Yup.object({
              fName: Yup.string("Podaj nazwę")
                .min(2, "Nazwa musi posiadać minimum 2 znaki")
                .max(15, "Nazwa musi posiadać maksimum 15 znaków")
                .required("Pole wymagane"),
              fAmount: Yup.number()
                .min(1, "Minimalna wartość")
                .required("Pole wymagane"),
              fCategory: Yup.string()
                .min(3, "Kategoria musi posiadać minimum 2 znaki")
                .max(15, "Kategoria musi posiadać maksimum 15 znaków")
                .required("Pole wymagane")
            })}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              addItem(values);
              resetForm({ values: "" });
            }}
          >
            <Form className="w-200" name="formularz" id="formularz">
              <Container>
                <Row>
                  <Col >
                    <MyInput
                      label="Nazwa: "
                      name="fName"
                      type="text"
                      placeholder="Wpisz nazwę"
                    />
                  </Col>
                  <Col>
                    <MyInput label="Cena: " name="fAmount" type="number" placeholder="0" />
                  </Col>
                  <Col>
                    <MyInput
                      label="Kategotia: "
                      name="fCategory"
                      type="text"
                      placeholder="Wpisz nazwę kategorii"
                    />
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                     <Button 
                      type="submit"
                      className="btn btn-primary btn-md btn-block mt-4"                     
                    >
                      Dodaj
                    </Button>
                   
                  </Col>
                </Row>
              </Container>
            </Form>
          </Formik>
          </div>
  
)
};
export default MyForm;