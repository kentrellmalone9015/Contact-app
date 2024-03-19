import React from "react";
import { useState } from "react"
import {useNavigate} from "react-router-dom";

const  AddContact = (props) => {
   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const add = (e) => {
        e.preventDefault();
        if(name === "" || email ===""){
            alert("All the fields are mandatory!");
            return;
        }
        const contact = 
            {
                name:name, 
                email:email
            }
        ;
        props.addContactHandler(contact);
        setName('');
        setEmail('');
        navigate('/');
    }
    return(
        <div className="ui main">
            <h2>Add Contact</h2>

            <form className="ui form" onSubmit={(e) => add(e)}>
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
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
    
}
export default AddContact;