import React, { useState } from 'react'
import { noteCategories } from '../Helper/cate'
import { v4 as uuidv4 } from 'uuid';

const CreateNote = ({modalToogle, setto}) => {

    const [formData, setFormData] = useState({id:'', title:'', category:'Please Select a Category', description:'', dateCreated: new Date().toUTCString()})
    const [allNotes, setAllNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const Ontype =(e)=>{
        setFormData(prevFormData => ({...prevFormData, [e.target.name]:e.target.value}))
    }

    const CreateTask =(e)=>{
        let newArr;
        e.preventDefault();
        if(formData.category === 'Please Select a Category'){
            newArr  = [...allNotes, {...formData, id:uuidv4(), category:'UnCategorized', author:currentUser?.email}];
        }else{
            newArr  = [...allNotes, {...formData, id:uuidv4(), author:currentUser?.email}];
        }
        setAllNotes(newArr)
        localStorage.setItem('notes', JSON.stringify(newArr));
        setFormData({id:'', title:'', category:'Please Select a Category', description:'' })
        setto(false);
        window.location.reload();
    }
  return (
        <div tabIndex="-1" 
        className={` ${modalToogle ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Note
                        </h3>
                        <button onClick={()=> setto(prev => !prev)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className=" bg sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={(e)=> CreateTask(e)}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input value={formData.title} type="text" name="title" onChange={(e)=> Ontype(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title" required />
                            </div>
                            <div>
                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select value={formData.category} name='category' onChange={(e)=> Ontype(e)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {noteCategories.map((item, index)=>{
                                            return (<option value={item.title} key={index} >{item.title}</option>) 
                                    })}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea value={formData.description} required name="description" onChange={(e)=> Ontype(e)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Write a note description here"/>                  
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new Note
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateNote
