import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputText, setInputText] = useState({
    topText : '',
    bottomText : ''
  })

  const [randomImg, setRandomImg] = useState(
    "https://i.imgflip.com/26am.jpg"
  )

  const [allMemeImgs, setAllMemeImgs] = useState([])

  const [memeName, setMemeName] = useState('One Does Not Simply');

  const handleChange = e => {
    setInputText({
      ...inputText,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * allMemeImgs.length)
    const randomImgUrl = allMemeImgs[randomNum].url;
    const randomImgName = allMemeImgs[randomNum].name;
    setRandomImg(randomImgUrl)
    setMemeName(randomImgName)
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => setAllMemeImgs(response.data.memes))
  }, [])

  console.log(allMemeImgs)

  return (
    <div className="meme-container">
      <div className="form-container">
        <h1>Create Meme</h1>
      <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      name="topText" 
      placeholder="top"
      value={inputText.topText} 
      onChange={handleChange}/>

      <input 
      type="text" 
      name="bottomText" 
      placeholder="bottom"
      value={inputText.bottomText} 
      onChange={handleChange}/>
      <button>Generate</button>
      </form>
      </div>

      <div className="form-container second">
      <div className="meme">
      <img src={randomImg} alt=""/>
      <h2 className="top">{inputText.topText}</h2>
      <h2 className="bottom">{inputText.bottomText}</h2>
      </div>

  <p>Meme Name : {memeName}</p>
      </div>
    </div>
  );
}

export default App;
