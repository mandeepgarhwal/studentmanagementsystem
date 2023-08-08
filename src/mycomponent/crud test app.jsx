import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'

export default function Sms() {
    const [currentstudents, setcurrentstudents] = useState()
    const [nametobeedited, setnametobeedited] = useState("")
    const [classtobeedited, setclasstobeedited] = useState("")
    const [idtobeedited, setidtobeedited] = useState()
    let newname = ""
    let newclass = ""
   

    useEffect(() => {
      axios.get(  "http://127.0.0.1:5000/posts")
      .then(res => (setcurrentstudents (res.data)))
      .catch(err => console.log(err))


    }, [ ])

    function deleterecord(element){
      console.log(element)
      axios.delete(`http://localhost:5000/posts/${element.id}`)
      .then(res => alert("record is deleted"))
      .catch(err => console.log(err))
      window.location.reload()
    }
    function editrecord(element, idnormal){
      console.log(element)
      document.getElementById("editpostform" ).style.display = ""
      document.getElementById("newpostbutton" ).style.display = "none"
      document.getElementById("studenttable" ).style.display = "none"
      setnametobeedited(element.name)
      setclasstobeedited(element.class)
      setidtobeedited(element.id)
      // window.location.reload()
    }
    function newrow(element){
        // console.log("newrow called");
        

        let idedit = element.id + 100
        let idnormal = element.id + 10
        


        return(
          
        <tr span = "row" className = {element.id} key = {element.id}>
            <th className = {element.id}>{element.id}</th>
            <td> 
            <p className = {idnormal}>{element.name} </p>
            </td>
            <td> 
            <p className = {idnormal}>{element.class} </p>
            </td>
            <td className = {idnormal}><button className='btn btn-danger btn-sm' onClick={() => editrecord(element, idnormal)}>Edit</button></td>
            {/* <td className= {idedit} style = {{display : "none" }}><button className='btn btn-info btn-sm' >Save</button></td>           */}
            <td className = {idnormal}><button className='btn btn-success btn-sm' onClick={() => deleterecord(element)}>delete</button></td>
        </tr>)
}
function enternewname(){
            document.getElementById("newpostform" ).style.display = ""
            document.getElementById("newpostbutton" ).style.display = "none"
            document.getElementById("studenttable" ).style.display = "none"
}
function setnewname(e){
   newname = e.target.value
    console.log(newname)
}
function setnewclass(e){
 newclass = e.target.value
console.log(newclass)
}

function addrecorddone(e){
    e.preventDefault()
    newname = document.getElementById("newname").value
    newclass = document.getElementById("newclass").value
    let newrecord = {
           
        "id": "",
        "name": newname,
        "class": newclass
    }
    console.log(newrecord)
    axios.post("http://127.0.0.1:5000/posts", newrecord)
    .then(res => (alert("New record added")))
    .catch(err => console.log(err.response.data))
            
    document.getElementById("newpostform" ).style.display = "none"
    document.getElementById("newpostbutton" ).style.display = ""
    document.getElementById("studenttable" ).style.display = ""
    window.location.reload()
}
function editrecorddone(e){
  e.preventDefault()
  let editedname = document.getElementById("editname").value
  let editedclass = document.getElementById("editclass").value
  let editedrecord = {
         
      "id": "",
      "name": editedname,
      "class": editedclass
  }
  console.log(editedrecord)
  axios.put(`http://127.0.0.1:5000/posts/${idtobeedited}`, editedrecord)
  .then(res => (alert("New record added")))
  .catch(err => console.log(err.response.data))
  
  document.getElementById("editpostform" ).style.display = "none"
  document.getElementById("newpostbutton" ).style.display = ""
  document.getElementById("studenttable" ).style.display = ""
  window.location.reload()
}


    
  return (
    <>
    <h1 className='bg-dark' style={{color : "red", textAlign: "center"}}>Student Management System</h1>
    
     <form id = "newpostform" style={{display : "none"}}>
        

        <br />
        <h2> Name</h2>
        <br />
        <input type="text" id ="newname"  style={{width : "60vw"}} onChange={(e) => (setnewname(e))}/>
        <br />
        <br />
        <h2> Class</h2>
        <br />
        <input type="text" id ='newclass' style={{width : "60vw"}} onChange={(e) => (setnewclass(e))}/>
        <br />
        <br />
        <button className='btn btn-info'style={{fontSize : "20px"}} onClick={(e) => addrecorddone(e)}>Create</button>
      </form>
      
      <form id = "editpostform" style={{display : "none"}}>
        

        <br />
        <h2> Name</h2>
        <br />
        <input type="text" id ="editname"  defaultValue = {nametobeedited} style={{width : "60vw"}} onChange={(e) => (setnewname(e))}/>
        <br />
        <br />
        <h2> Class</h2>
        <br />
        <input type="text" id ='editclass' defaultValue = {classtobeedited} style={{width : "60vw"}} onChange={(e) => (setnewclass(e))}/>
        <br />
        <br />
        <button className='btn btn-info'style={{fontSize : "20px"}} onClick={(e) => editrecorddone(e)}>Create</button>
      </form>


        
        <button className='btn btn-primary' id = "newpostbutton"style={{fontSize : "20px"}} onClick={enternewname}>Add new Student</button>
                <table  id = "studenttable" className="table">
                <thead>
                  <tr>
                    <th scope="col">Sr. no.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Class</th>
                    <th scope="col" colSpan={2} style={{textAlign : "center"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {
                          currentstudents &&
                          currentstudents.map((element) => (
              
                              // console.log(element.name),
                              newrow(element)
                          
                          ))
              
                      }
                </tbody>
              </table>
              </>
    )}

       

  

