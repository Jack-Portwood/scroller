import React ,{useEffect,useState,Fragment} from 'react'
import SingleScrollItem from "./SingleScrollItem"

//state to go here
//arrayOfPhrases objects
//selectedPhrase

//phraseObject{id:uuid,text:phrase,speed:number,css:css}


const ScrollChoicesComponent = () => {

function updatePhrases(event){
  event.preventDefault()
console.log(phrases[0] +"hiya")

}

const [phrases,setPhrases]=useState([{id:0,text:"this is the first item",speed:5,css:"placeholder"},{id:1,text:"this is the second item",speed:10,css:"placeholder"},{id:2,text:"this is the third item",speed:3,css:"placeholder"}])

  return(
    <Fragment>
    <h2>Hello from the Scroll Choices component</h2>
    <SingleScrollItem phrases={phrases} updatePhrases={updatePhrases}/>
    </Fragment>
  )
}



export default ScrollChoicesComponent;
