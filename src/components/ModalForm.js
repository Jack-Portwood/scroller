import React, { useState } from "react";
import Modal from "react-modal";
import { IoIosOptions, IoIosAddCircleOutline,IoIosTrash,IoIosSave, IoIosCloseCircleOutline} from "react-icons/io";

const ModalForm = ({ item, createPhrase, deletePhrase }) => {
  const [newText, setNewText] = useState(item.text);
  const [newSpeed, setNewSpeed] = useState(item.speed);
  const [newCss, setNewCss] = useState(item.css);
  const [modalIsOpen, setIsOpen] = useState(false);


  //two options for modal image render
  const optionBtn = (
    <IoIosOptions className="options-btn" onClick={changeModal} />
  );
  const addBtn = (
    <IoIosAddCircleOutline className="options-btn" onClick={changeModal} />
  );


  //function for form to update text on change
  function updateText(e) {
    let myText = e.target.value;
    setNewText(myText);
  }

  //function for form to update speed on change
  function updateSpeed(e) {
    let mySpeed = parseInt(e.target.value);
    setNewSpeed(mySpeed);
  }

  //function for form to update style/css on change
  function updateStyle(e){
    let myStyle=e.target.value
    setNewCss(myStyle)

  }

  //open and close modal by inverting state
  //if text exists it calls setNewtext() function
  function changeModal() {
    item.id?setNewText(item.text):setNewText("")
    setIsOpen(!modalIsOpen);
  }

  //takes existing state, updates elements requested to be updated, then passes
  //new state to be set in ScrollChoicesComponent.
  //Subsequently (async) closes modal
  function updateAndClose(id, text, speed ,css){
    createPhrase(id, text, speed ,css)
    .then(changeModal())
  }

  //creates new phrase then closes modal
  function createAndClose(text, speed, css){
    createPhrase(text, speed, css)
    changeModal()
  }


  // point of entry within html for Modal.
  Modal.setAppElement("body");

  // returns Modal containing form as well all options button.
  return (
    <div className="modelWrapper">
      {item.css ? optionBtn : addBtn}

      <Modal className="myModal" isOpen={modalIsOpen}>
        <h1 className="logoFont">Customize Your Message</h1>
        <div className="formWrapper">
          <form onSubmit={() => createPhrase(item.id)}>
            <h4 className="inputHeader">Input text</h4>
            <input
              className="inputBox"
              type="text"
              name="phraseInput"
              value={newText}
              onChange={updateText}
            ></input>
            <h4 className="speedHeader">Speed</h4>
            <div className="speedDiv">
              <label className="speedSelect">
                <p>Low</p>
              </label>
                <input
                  className="speedSelect"
                  type="radio"
                  value={2}
                  name="updateSpeed"
                  onChange={updateSpeed}
                  required
                ></input>
              <label className="speedSelect">
                <p>Med</p>
              </label>
                <input
                  className="speedSelect"
                  type="radio"
                  value={5}
                  name="updateSpeed"
                  onChange={updateSpeed}
                  required
                ></input>
              <label className="speedSelect">
                <p>High</p>
              </label>

                <input
                  className="speedSelect"
                  type="radio"
                  value={15}
                  name="updateSpeed"
                  onChange={updateSpeed}
                  required
                ></input>
            </div>


            <h4 className="styleHeader">Style</h4>
            <div className="styleDiv">
              <label className="styleSelect">
                <p>Red</p>
              </label>
                <input
                  className="styleSelect"
                  type="radio"
                  value={"red"}
                  name="updateStyle"
                  onChange={updateStyle}
                  required
                ></input>
              <label className="styleSelect">
                <p>Green</p>
              </label>
                <input
                  className="styleSelect"
                  type="radio"
                  value={"green"}
                  name="updateStyle"
                  onChange={updateStyle}
                  required
                ></input>
              <label className="styleSelect">
                <p>Blue</p>
              </label>

                <input
                  className="styleSelect"
                  type="radio"
                  value={"blue"}
                  name="updateStyle"
                  onChange={updateStyle}
                  required
                ></input>

            </div>
            <div className="styleDiv">
              <label className="styleSelect">
                <p>Gold</p>
              </label>
                <input
                  className="styleSelect"
                  type="radio"
                  value={"gold"}
                  name="updateStyle"
                  onChange={updateStyle}
                  required
                ></input>
              <label className="styleSelect">
                <p>Orange</p>
              </label>
                <input
                  className="styleSelect"
                  type="radio"
                  value={"orange"}
                  name="updateStyle"
                  onChange={updateStyle}
                  required
                ></input>
              <label className="styleSelect">
                <p>Purple</p>
              </label>

                <input
                  className="styleSelect"
                  type="radio"
                  value={"purple"}
                  name="updateStyle"
                  onChange={updateStyle}
                  required
                ></input>

            </div>
            <br />
          </form>
          {item.id ? (
              <IoIosSave  className="savebtn" onClick={() => updateAndClose(item.id, newText, newSpeed, newCss)}/>
          ) : (
            <IoIosSave  className="savebtn" onClick={() => createAndClose(newText, newSpeed, newCss)}/>
          )}


          {item.css ? (
            <IoIosTrash className="deletebtn" onClick={()=>deletePhrase(item.id)}/>
          ) : null}
          <IoIosCloseCircleOutline className="closebtn" onClick={changeModal}/>
        </div>
      </Modal>
    </div>
  );
};

export default ModalForm;
