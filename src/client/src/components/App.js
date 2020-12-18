import React,{useEffect, useState} from 'react';
import {getEvents,getPromotions} from '../data/api';
import { Form, Checkbox } from "semantic-ui-react";

function App() {
  const [events, setEvents] = useState([]);
  const [promotions, setPromotions] = useState({});
  const [totalPrice, setProductPrice] = React.useState(0.00);
  useEffect(() => {
    getEvents().then(setEvents);
  }, [true]);
  useEffect(() => {
    getPromotions().then(setPromotions);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {
          <div>
          <h1>Shopping Cart</h1>
          <hr noshade />
          <h2>Experiences:</h2>
          <Form.Group inline>
          <Checkbox  label={"2 Wine Tour packages to Yarra Valley and Macedon Ranges-$440 per tour"} value={{wineTour:2}}  onChange={(e,data) => {
             data.checked === true ? setProductPrice(getPrices(data.value,events)-getDiscount(data.value,promotions, events)) : setProductPrice(0);
          }}/>
          <Checkbox  label={"4 Wine Tour packages to Yarra Valley- $440 per tour"} value={{wineTour:4}}  onChange={(e,data) => {
             data.checked === true ? setProductPrice(getPrices(data.value,events)-getDiscount(data.value,promotions, events)) : setProductPrice(0);
          }}/>
          <Checkbox  label={"3 Wine Tour packages to Yarra Valley and a picnic- $440 per tour & picnic cost - $110"} value={{wineTour:3,picnic:1}}  onChange={(e,data) => {
             data.checked === true ? setProductPrice(getPrices(data.value,events)-getDiscount(data.value,promotions,events)) : setProductPrice(0);
          }}/>
          <Checkbox  label={"5 Wine Tour packages to Yarra Valley- $440 per tour"} value={{wineTour:5}}  onChange={(e,data) => {
             data.checked === true ? setProductPrice(getPrices(data.value,events)-getDiscount(data.value,promotions,events)) : setProductPrice(0);
          }}/>
          </Form.Group>
          <hr noshade />
            <div className="payment-div">
            <h4>Cost of Event selected including discount in AUD :  ${totalPrice} 😃</h4>
            </div>
          </div>
        }
      </header>
    </div>
  );
}

const getDiscountValueWithThreshold = (promotion, purchaseQuantity, cost=0)=>{
const threshold = parseFloat(promotion.threshold)
let promoValue="";
  if(purchaseQuantity===threshold)
  {
    switch (promotion.type) {
      case "event":
        promoValue = promotion.value;
        return parseFloat(promoValue);
      case "amount":
        promoValue =  promotion.value;
        return parseFloat(promoValue);
      case "percentage":
        promoValue =  promotion.value;
        return parseFloat(promoValue) * cost;
      default:
          return 0;
    }
  }
  return 0;
}

const getDiscountValueWithGreaterThreshold = (promotion, purchaseQuantity, cost=0)=>{
  const threshold = parseFloat(promotion.threshold)
  let promoValue="";
    if(purchaseQuantity>=threshold)
    {
      switch (promotion.type) {
        case "event":
          promoValue = promotion.value;
          return parseFloat(promoValue);
        case "amount":
          promoValue =  promotion.value;
          return parseFloat(promoValue);
        case "percentage":
          promoValue =  promotion.value;
          return parseFloat(promoValue) * cost;
        default:
            return 0;
      }
    }
    return 0;
  }
const getDiscount = (purchase, promotions,events) =>{
  const key = Object.keys(purchase);
  let discount={};
  let discountAmnt = 0;
  switch (true) {
    case key.includes("wineTour") || key.includes("wineTour") && key.includes("picnic"):
      discount = promotions["wineTours|Picnics"]
     const winetour = parseFloat(purchase["wineTour"]);
     const picnic = parseFloat(purchase["picnic"] === undefined ? 0 : purchase["picnic"]);
      const val = winetour + picnic;
      discountAmnt = getDiscountValueWithThreshold(discount,val)
      const discountValue = purchase["picnic"] === undefined? parseFloat(events["wineTour"].cost) : parseFloat(events["picnic"].cost)
      discountAmnt === 0 ? discountAmnt = 0 : (discountAmnt = discountValue);
      break;
    case key.includes("teamBuilding"):
      discount = promotions["teamBuildings"]
      discountAmnt = getDiscountValueWithThreshold(discount,purchase[key].value)
      break;
    case key.includes("picnic"):
      discount = promotions["picnic"]
      discountAmnt = getDiscountValueWithThreshold(discount,purchase[key].value)
      break;
  }
  if(discountAmnt===0){
    return getDiscountValueWithGreaterThreshold(promotions["any"],purchase[key], events[key].cost)
  }else{
    return discountAmnt;
  }
}
const getPrices = (purchase,events)=>{
    let price=0;
    Object.keys(purchase).forEach(key => {
      price += getPurchaseCost(key, purchase[key],events)
    })
   return price;
}
const getPurchaseCost = (key,quantity,events)=>{
  let tour={};
  switch (key.toString()) {
    case "wineTour":
      tour = events["wineTour"]
      return parseFloat(tour.cost)*parseFloat(quantity);
    case "teamBuilding":
      tour = events["teamBuilding"]
      return parseFloat(tour.cost)*parseFloat(quantity);
    case "kidsParty":
      tour = events["kidsParty"]
      return parseFloat(tour.cost)*parseFloat(quantity);
    case "picnic":
      tour = events["picnic"]
      return parseFloat(tour.cost)*parseFloat(quantity);
    default:
      return 0.00
  }

}

export default App
// const price = Object.keys(purchase).reduce((sum,key)=>sum+parseFloat(purchase[key]||0),0);