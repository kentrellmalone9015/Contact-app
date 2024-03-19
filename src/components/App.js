import React ,{useState,useEffect}from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import generateApiKey from 'generate-api-key';
// import { uuid} from 'uuid';
import api from '../api/contact';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from './EditContact';
import ContactList from './ContactList';
import ContactDetail from './CotactDetail';

const App = () => {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  
  //Retrieve Contacts
  const retrieveContacts = async() => {
    const response = await api.get("/contact");
    return response.data;
  }
  
  const addContactHandler = async (contact) =>{
    console.log(contact);
    const request = {
      id: generateApiKey(),
      ...contact
    };
    const response = await api.post("/contact",request);
    setContacts([...contacts,response.data]);
  };


  // Update contacts and it will be passed props to EditContact Component
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contact/${contact.id}`,contact);
    const {id , name , email} = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id? {...response.data}:contact;
    }));
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contact/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const searchHandler = (value) => {
    setSearchTerm(value);
    if(value !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(' ')
        .toLowerCase()
        .includes(value.toLowerCase());
      });
      setSearchResult(newContactList);
    }else{
      setSearchResult(contacts);
    }
    
  };
  useEffect(()=>{
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);



  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route
           exact path='/' 
           element = {
              <ContactList 
                contacts = {searchTerm.length < 1 ? contacts : searchResult} 
                getContactId = {removeContactHandler}
                searchKeyword = {searchHandler}
                term = {searchTerm}/>}
          />
          <Route 
            exact path='/add'
            element = {
              <AddContact 
                addContactHandler = {addContactHandler}/>}/>
          <Route 
            exact path='/edit'
            element = {
              <EditContact 
                updateContactHandler = {updateContactHandler}/>}/>
          <Route
            path='/contact/:id' element={ContactDetail}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
