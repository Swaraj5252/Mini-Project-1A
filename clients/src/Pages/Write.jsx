import React,{useState} from 'react'
import { useThemeContext } from '../Context/themeContext'
import {AiOutlinePlus} from "react-icons/ai"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { useLoginContext } from '../Context/loginContext';

const Write = () => {
    const {darkMode} = useThemeContext()
    const {user} = useLoginContext()
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")

    const catData = ["web development", "app development", "cloud computing", "backend", "database", "sql", "Iot", "AR-VR", "react", "react-native", "angular", "flutter", "java", "kotlin", "devOps", "machine learning", "data science", "ruby", "cyber security", "web scrapping", "machine learning", "data analytics", "data engineering", "other"]


//     const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const storageRef = firebase.storage().ref();
//     const imageRef = storageRef.child(file.name);

//     imageRef.put(file).then(() => {
//       console.log('Image uploaded successfully');
//     });
//   };
    const handleSubmit = async (e) => {
        e.preventDefault()
            // file/image upload
            const fileName = new Date().getTime() + image
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, image)
            await uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                        default:
                    }
                }, 
                (err) => {
                    // handles sucessfull errors
                    // console.log("error!");
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                        const newBlog = {title, image: downloadURL, authorID: user._id, author: user.username, category, content}
                        const res = await axios.post("/blogs", newBlog)
                        window.location.replace("/blogs")
                        console.log('File available at', downloadURL, res);
                    });
                }
                );
    } 


  return (
    <section className={darkMode ? "relative lg:pt-2 h-full bg-black text-white" : "relative lg:pt-2 h-full bg-white text-black"} >
        {/* <div className='' > */}
        <div className='lg:w-10/12 py-7  lg:h-full w-11/12 mx-auto'>
          {image ? <div className='h-96 mb-3'> <img alt={title} className='h-full object-cover rounded-lg w-full' src={URL.createObjectURL(image)} /> </div> : <div className='border-dotted mb-3 border-2 border-sky-500  lg:w-full h-80'> <p className='text-center relative top-36'>Add image for your blog</p> </div>}
            <input required id="fileInput" type="file" 
            style={{ display: "none" }} onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="fileInput">
            <AiOutlinePlus className={darkMode ? 'cursor-pointer rounded-full border-white border-2 p-1 text-3xl' : 'cursor-pointer rounded-full border-black border-2 p-1 text-3xl'} />
            </label>
            
          <div className='flex justify-between flex-col lg:flex-row my-3 lg:items-center gap-3 lg:gap-3' >
            <input required autoFocus onChange={(e) => setTitle(e.target.value)} type="text" className={darkMode ? 'bg-inherit border-[2px] lg:w-6/12 w-full rounded-md px-2 py-1 text-2xl border-blue-500' : 'bg-inherit lg:w-6/12 border-[2px] rounded-md px-2 py-1 text-2xl border-blue-900'} placeholder='Title' />
            <div className='flex gap-2 text-xl items-center' >
                <label >  Category  </label>
                <select className={darkMode ? 'bg-inherit border-[2px] w-full rounded-md text-xl px-2 border-blue-500' : 'bg-inherit w-full border-[2px] px-2 rounded-md text-xl border-blue-900'} onChange={(e) => setCategory(e.target.value)} >
                    {catData.map((c, index) => {
                        return <option className={darkMode ? "bg-black" : "bg-white"} value={c} key={index} > {c} </option>
                    })}
                </select>
            </div>
          </div>
          <textarea required autoFocus onChange={(e) => setContent(e.target.value)} rows={15} className={darkMode ? 'bg-inherit border-[2px] w-full rounded-md px-2 py-1 text-2xl border-blue-500' : 'bg-inherit w-full border-[2px] rounded-md px-2 py-1 text-2xl border-blue-900'} placeholder='Tell your story' />
          <button onClick={handleSubmit} type='sumbit' className='bg-green-500 text-white text-xl rounded-md px-2 py-1'> Publish <i className="fa-solid fa-upload"></i> </button>
        </div>
        {/* </div> */}
    </section>
  )
}
// {image ? <div className='h-96 mb-3'> <img alt={title} className='h-full object-cover rounded-lg w-full' src={URL.createObjectURL(image)} /> </div> : <div className='border-dotted mb-3 border-2 border-sky-500  lg:w-full h-80'> <p className='text-center relative top-36'>Add image for your blog</p> </div>}


export default Write