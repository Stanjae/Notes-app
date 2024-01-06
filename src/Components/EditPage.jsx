import React, { useState } from 'react'
import { noteCategories } from '../Helper/cate'
import { v4 as uuidv4 } from 'uuid';

const EditPage = ({editToogle,  setEditToogle, selectedNote, setSelectedNote}) => {

    /* const [formData, setFormData] = useState(selectedNote) */
    const [allNotes, setAllNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])

    const Ontype =(e)=>{
        setSelectedNote(prevFormData => ({...prevFormData, [e.target.name]:e.target.value}))
    };

    const UpDateTask =(e)=>{
        let newArr;
        e.preventDefault();
        if(selectedNote.category === 'Please Select a Category'){
            newArr  = allNotes?.map(item => (item.id === selectedNote.id ? {...selectedNote, category:'UnCategorized'}: item));
        }else{
            newArr  = allNotes?.map(item => (item.id === selectedNote.id ? {...selectedNote}: item));
        }
        setAllNotes(newArr)
        localStorage.setItem('notes', JSON.stringify(newArr));
        setEditToogle(false);
    }

  return (
    <div
      tabIndex="-1"
      className={` ${
        editToogle ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Note
            </h3>
            <button
              onClick={() => setEditToogle((prev) => !prev)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className=" bg sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={(e) => UpDateTask(e)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  value={selectedNote?.title}
                  type="text"
                  name="title"
                  onChange={(e) => Ontype(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Title"
                  required
                />
              </div>
              <div>
                <label
                  for="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  value={selectedNote?.category}
                  name="category"
                  onChange={(e) => Ontype(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  {noteCategories.map((item, index) => {
                    return (
                      <option value={item.title} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  value={selectedNote?.description}
                  required
                  name="description"
                  onChange={(e) => Ontype(e)}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write a note description here"
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
              </svg>
              Update Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPage
