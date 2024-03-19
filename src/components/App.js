import React ,{useState,useEffect}from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import generateApiKey from 'generate-api-key';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from './ContactList';
import ContactDetail from './CotactDetail';

const App = () => {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const addContactHandler = (contact) =>{
    console.log(contact);
    setContacts([...contacts,{id:generateApiKey(), ...contact}]);
  };
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }
  useEffect(()=>{
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContacts.length !== 0) {
      setContacts(retriveContacts);}
  }, []);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);
  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route
           exact path='/' 
           Component = {() => (
              <ContactList 
                contacts={contacts} 
                getContactId={removeContactHandler}/>)}
          />
          <Route 
            exact path='/add'
            Component = {() => (
              <AddContact 
                addContactHandler = {addContactHandler}/>)}/>
          <Route
            path='/contact/:id' Component={ContactDetail}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
