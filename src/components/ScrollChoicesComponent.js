import React ,{useState,Fragment,useEffect} from 'react'
import ScrollScreen from "./ScrollScreen"
import DeviceOrientation, {Orientation} from 'react-screen-orientation'
import { isCompositeComponent } from 'react-dom/test-utils';
import uuid from 'react-uuid'



//phraseObject{id:uuid,text:phrase,speed:number,css:css}



const ScrollChoicesComponent = () => {

// passed to modal to update existing phrases state with amendments.
function updatePhrases(event) {
  event.preventDefault();
  console.log("hiya");
}

// passed to modal to create new phrases and to push into phrases state.
function createPhrase(event) {
  event.preventDefault();
  const spacialString=" "+event.target.phraseInput.value
  const newPhrase={id:uuid(),text:spacialString, speed:event.target.updateSpeed.value, css: "placeholder"}
  setPhrases([...phrases,newPhrase])
  console.log("Hello");
}


function deletePhrase(id) {
  setPhrases(phrases.filter((phrase)=>(phrase.id !== id)))

}

//sets selected phrase to be displayed on rotation
function usePhrase(event) {
  event.preventDefault();
  let newValue = (event.target.value)
  for (let i = 0; i < phrases.length; i++){
      if(phrases[i].id === newValue) {
        setSelectedPhrase(phrases[i])
      }
    }
}

//list of phrases objects.
const [phrases, setPhrases] = useState([
{id:uuid(), text:" Hello World, I am still in development view on your mobile device",
    speed:5,css: "placeholder"
  }
]);

const LOCAL_STORAGE_KEY="phrasesStore"

useEffect(()=>{
    const phrasesFetch=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(phrasesFetch){
      setPhrases(phrasesFetch);
    }
  },[]);

useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(phrases))
},[phrases])

// state for selected phrase to be passed into rotated component.
let [selectedPhrase, setSelectedPhrase] = useState(phrases[0]);


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
}


export default ScrollChoicesComponent;
