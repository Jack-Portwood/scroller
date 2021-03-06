import React, { useState, Fragment, useEffect } from "react";
import ScrollScreen from "./ScrollScreen";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import uuid from "react-uuid";
const ScrollChoicesComponent = () => {

  // passed to modal to update existing phrases state with ammendments.
  async function updatePhrases(id, newText, newSpeed, newCss) {
    const startingPhrases = phrases;

    for (let i = 0; i < startingPhrases.length; i++) {
      if (startingPhrases[i].id === id) {
        startingPhrases[i].text = newText;
        startingPhrases[i].speed = newSpeed;
        startingPhrases[i].css = newCss;
      }
    }
    setPhrases([...startingPhrases]);
  }

  // passed to modal to create new phrases and to push into phrases state.
  //default values added to avoid user input errors

  function createPhrase(text = "", speed = 2, css = "red") {
    const spacialString = " " + text;
    const newPhrase = {
      id: uuid(),
      text: spacialString,
      speed: speed,
      css: css,
    };
    setPhrases([...phrases, newPhrase]);
  }

  //deletes given phrase from phrases array
  function deletePhrase(id) {
    setPhrases(phrases.filter((phrase) => phrase.id !== id));
  }

  //sets selected phrase to be displayed upon rotation
  function usePhrase(event) {
    event.preventDefault();
    let newValue = event.target.value;
    for (let i = 0; i < phrases.length; i++) {
      if (phrases[i].id === newValue) {
        setSelectedPhrase(phrases[i]);
      }
    }
  }

  //list of phrases objects. phraseObject structure =>{id:uuid,text:phrase,speed:number,css:color}
  const [phrases, setPhrases] = useState([
    {
      id: uuid(),
      text: " Welcome to Scroller",
      speed: 5,
      css: "red",
    },
  ]);

  // state for selected phrase to be passed into rotated component.
  let [selectedPhrase, setSelectedPhrase] = useState({
    id: uuid(),
    text: " Welcome to Scroller, please open on phone or dev-tools ",
    speed: 5,
    css: "red",
  });


  //local storage used to maintain state between user sessions. Stores list of phrases and selected phrase
  const LOCAL_STORAGE_KEY = "phrasesStore";

  useEffect(() => {
    const phrasesFetch = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (phrasesFetch) {
      setPhrases(phrasesFetch[0]);
      setSelectedPhrase(phrasesFetch[1])
    }
  }, []);

  useEffect(() => {
    const allState = [phrases, selectedPhrase];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allState));
  }, [phrases, selectedPhrase]);

  //imported orientation component return view of horizontal screen
  //and view portrait screen.
  return (
    <DeviceOrientation lockOrientation={"portrait"}>
      <Orientation orientation="portrait" alwaysRender={false}>
        <Fragment>
          <ScrollScreen
            phrases={phrases}
            updatePhrases={updatePhrases}
            deletePhrase={deletePhrase}
            rotated={false}
            createPhrase={createPhrase}
            usePhrase={usePhrase}
          />
        </Fragment>
      </Orientation>

      <Orientation orientation="landscape" alwaysRender={false}>
        <Fragment>
          <ScrollScreen
            phrases={phrases}
            selectedPhrase={selectedPhrase}
            rotated={true}
          />
        </Fragment>
      </Orientation>
    </DeviceOrientation>
  );
};

export default ScrollChoicesComponent;
