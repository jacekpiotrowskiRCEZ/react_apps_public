import React from 'react';
import './ExpenseEntryItemList.css';

class ExpenseEntryItemList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: this.props.items
      }
      this.handleMouseEnter = this.handleMouseEnter.bind();
      this.handleMouseLeave = this.handleMouseLeave.bind();
      this.handleMouseOver = this.handleMouseOver.bind();
   }
   handleMouseEnter(e) {
      e.target.parentNode.classList.add("highlight");
   }
   handleMouseLeave(e) {
      e.target.parentNode.classList.remove("highlight");
   }
   handleMouseOver(e) {
      console.log("The mouse is at (" + e.clientX + ", " + e.clientY + ")");
   }
   handleDelete = (id, e) => {
      e.preventDefault();
      console.log(id);
      this.setState((state, props) => {
         let items = [];
         state.items.forEach((item, idx) => {
            if(item.id != id)
               items.push(item)
         })
         let newState = {
            items: items
         }
         return newState;
      })
   }
   getTotal() {
      let total = 0;
      for(var i = 0; i < this.state.items.length; i++) {
         total += this.state.items[i].amount
      }
      return total;
   }
   /* OK !!!!*/
   addItem=()=>{
    
      //let maxID=this.state.items[0].id;
      let maxID;
      if(this.state.items[0] == null){
      maxID=0;
      }
      else{
      maxID=this.state.items[0].id;
      }
      for(var i = 0; i < this.state.items.length; i++) {
     console.log(this.state.items[i].id +"  _  ");
         if(maxID<this.state.items[i].id) maxID=this.state.items[i].id;
      }
      maxID++;
      let now=new Date();
      let newItem = prompt("Podaj nazwę pozycji");
      let newAmount =Number(prompt("Podaj kwotę"));
      let newCategory=prompt("Podaj nazwę kategorii");
   
      let myItem={ id: maxID, name: newItem, amount: newAmount, spendDate: now, category: newCategory };

      this.setState(prevState=>({
         items:[
            ...prevState.items
         ]
      }))
     
      this.state.items.push(myItem);
   }

   wypiszID=()=>{
      let maxID=this.state.items[0].id;
      for(var i = 0; i < this.state.items.length; i++) {
       console.log(this.state.items[i].id +"  _  ");
         if(maxID<this.state.items[i].id) maxID=this.state.items[i].id;
   }

   console.log("MAX  "+maxID);
}
   render() {
      const lists = this.state.items.map((item) =>
         <tr key={item.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <td>{item.name}</td>
            <td>{item.amount}</td>
            <td>{new Date(item.spendDate).toDateString()}</td>
            <td>{item.category}</td>
            <td><a href="#" 
               onClick={(e) =>  this.handleDelete(item.id, e)}>Remove</a></td>
         </tr>
      );
      return (
         <table onMouseOver={this.handleMouseOver}>
            <thead>
               <tr>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Remove</th>
               </tr>
            </thead>
            <tbody>
               {lists}
               <tr>
                  <td colSpan="1" style={{ textAlign: "right" }}>Total Amount</td>
                  <td colSpan="4" style={{ textAlign: "left" }}>
                     {this.getTotal()}
                  </td> 
               </tr>
               <tr colSpan="5"><td> <span onClick={this.addItem}>  Dodaj do listy </span>&nbsp;&nbsp;&nbsp;&nbsp;
                     <span onClick={this.wypiszID}>  wypiszID</span></td></tr>
            </tbody>
         </table>
      );
   }
}
export default ExpenseEntryItemList;