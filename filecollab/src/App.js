import {useState, useEffect, useRef}  from 'react';
import './App.css'
import {uploadFile } from './service/api';


function App(){
    const [file, setFile] = useState('');
    const [result, setResult] = useState('');
    const fileInputRef = useRef();


    const url = 'https://i.pinimg.com/236x/4b/05/0c/4b050ca4fcf588eedc58aa6135f5eecf.jpg'

    useEffect(()=> {
         const getImage =  async()=>{
              if(file){
                   const data = new FormData();
                   data.append("name", file.name);
                   data.append("file", file);

                   const response = await uploadFile(data);
                   setResult(response.path);
              }
         }
         getImage();
    },[file])

    const onUploadClick = () => {
          fileInputRef.current.click()
    }

    return(
        <div className="container">
              <img src={url} className='img' />
              <div className="wrapper">
                   <h1>simple file sharing </h1>
                   <p>Upload and share the download link.</p>
   
                 <button
                 onClick={()=> onUploadClick()}>
                  Upload 
                 </button>

                 <input type="file" ref={fileInputRef} style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])} />


                 <a href={result} target='_blank'>{result}</a>


              </div>
        </div>
    )
}
export default App;
