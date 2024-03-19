import React from "react";
import { useState } from "react"
import {useNavigate, useLocation} from "react-router-dom";

const  EditContact = (props) => {
   
    
    const navigate = useNavigate();
    const location = useLocation();
    const contact = location.state.contact;

    const [id, setId] = useState(contact.id);
    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);

    const edit = (e) => {
        e.preventDefault();
        if(name === "" || email ===""){
            alert("All the fields are mandatory!");
            return;
        }
        const update_contact = 
            {
                id : id,
                name : name, 
                email : email
            }
        ;
        props.updateContactHandler(update_contact);
        navigate('/');
    }
    return(
        <div className="ui main">
            <h2>Edit Contact</h2>

            <form className="ui form" onSubmit={(e) => edit(e)}>
                <div className="field">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name ="name" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => {setName(e.target.value)}} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}} />
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
    
}
export default EditContact;