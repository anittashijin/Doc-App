import React, { useState , useEffect} from 'react';
import { Button,  Modal } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'



import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

function Createdocs() {
  const postData = async()=>{
    await addDoc(docsCollectionRef,{
      title:docTitle,
      discription:""
    })
    setReaload(docTitle)
  }

    const [show, setShow] = useState(false);
    const [allDocs,setAllDocs] = useState([])
    const [docTitle,setDocTitle] = useState("")
    const [reload,setReaload] = useState('')


    const docsCollectionRef = collection(firestore,'documents')

    const getAllDocs = async()=>{
      const docsData = await getDocs(docsCollectionRef)
      const data = docsData.docs.map(doc =>(
        {
          ...doc.data(),
          id:doc.id
        }
      ))
      setAllDocs(data)
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()
    const handleEdit = (data) =>{
      navigate('/changebox',{state:data})
    }

    const deleleDocs = async(id)=>{
      const oneDoc = doc(firestore,'documents',id)
      await deleteDoc(oneDoc)
      setReaload(id)
    }

    const handleAdd = () =>{
      postData()
      alert(`Document ${docTitle} added successfully`)
      setShow(false);
    } 

    const handleChange =(e)=>{
      setDocTitle(e)
    }


    useEffect(()=>{
      getAllDocs()
    },[reload])
    return (
        <>

            <div>
                <button className='btn btn-info' style={{ marginLeft: '10px',marginLeft:'650px'}} onClick={handleShow}> <b>Add Documents</b></button>
            </div>
            <Modal size='lg'centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><b>Add New documents</b></Modal.Title>
        </Modal.Header>
          <Modal.Body> <input type="text" className='form-control' style={{width:'50%',height:'30px'}}    onChange={(e)=>handleChange(e.target.value)}/></Modal.Body>
  
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAdd} >
            Save 
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row mt-5">
          {allDocs?.length>0?allDocs.map((item)=>(
            <div key={item.id} className="col-lg-8 mb-4">
            <div style={{height:'80px',marginLeft:'500px'}} className='border rounded '>
              <div className='d-flex justify-content-between px-3 py-2 '>
                <h4 className='mb-0 '><b>{item.title}</b></h4>
                <div className='d-flex justify-content-center align-items-center'>
                  <button onClick={()=>handleEdit(item)} className='btn'><i className="fa-solid fa-pen-to-square text-info"></i></button>
                  <button onClick={()=>deleleDocs(item.id)} className='btn'><i className="fa-solid fa-trash text-primary"></i></button>
                </div>
              </div>
              <p style={{textAlign:'justify'}} className='px-3'>{item.discription.replace(/<[^>]+>/g, '')}</p>
            </div>
          </div>
           ))
           :
           <div></div>
           }
          </div> 
        </>
    )
}

export default Createdocs;