import React ,{useState} from 'react'
import Ticker from 'react-ticker'
import Modal from 'react-modal';
import ModalForm from './ModalForm'



const ScrollScreen=({phrases})=>{



  const phrase = phrases.map(item =>{

    return (
      <div className="container">
          <Ticker className="ticker" speed={item.speed}>
            {({}) => (
              <>
              <div className="text-div">
               <h1 className="ticker-text">  {item.text} </h1>
               </div>
              </>
            )}
          </Ticker>
        <ModalForm item={item} />
      </div>
    );
  } )

  return(
    [phrase]
  )

}

export default ScrollScreen;
