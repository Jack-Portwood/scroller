import React ,{useState,Fragment} from 'react'
import ScrollScreen from "./ScrollScreen"
import DeviceOrientation, {Orientation} from 'react-screen-orientation'

//state to go here
//arrayOfPhrases objects
//selectedPhrase

//phraseObject{id:uuid,text:phrase,speed:number,css:css}



const ScrollChoicesComponent = () => {

function updatePhrases(event) {
  event.preventDefault();
  console.log(phrases[0] + "hiya");
}

function createPhrase(event) {
  event.preventDefault();
  console.log("Hello");
}


const [phrases, setPhrases] = useState([
  { id: 0, text: "this is the first item", speed: 2, css: "placeholder" },
  {
    id: 1,
    text:
      " Hello World, I am still in development view on your mobile device",
    speed: 5,
    css: "placeholder",
  },
  { id: 2, text: "this is the third item", speed: 15, css: "placeholder" },
]);

const [selectedPhrase, setSelectedPhrase] = useState(phrases[1]);


  return (
    <DeviceOrientation lockOrientation={"portrait"}>
      <Orientation orientation="portrait" alwaysRender={false}>
        <Fragment>
          <ScrollScreen
            phrases={phrases}
            updatePhrases={updatePhrases}
            rotated={false}
            createPhrase={createPhrase}
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
