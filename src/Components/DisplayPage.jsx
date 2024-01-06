import React, { useEffect, useState } from 'react'
import Card from './Card'
import EditPage from './EditPage'
import { useClearStore } from '../Hooks/useClearStore'
import DeleteConfirmation from './DeleteConfirmation'
import CreateNote from './CreateNote'

const DisplayPage = () => {
    const [toogle, setToogle] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const[modalToogle, setModalToogle] = useState(false);

    let notesi = JSON.parse(localStorage.getItem('notes'))?.filter(item => item?.author === currentUser?.email) || [];

    let notesy = JSON.parse(localStorage.getItem('notes'))?.filter(item => item?.author === currentUser?.email) || [];

    const [notes, setNotes] = useState(notesi)

    const [selectedNote, setSelectedNote] = useState(null)

    const [deleteToogle, setDeleteToogle] = useState(false);

    const [search, setSearch] = useState('');

    const [editToogle, setEditToogle] = useState(false);

    //for select
    const SelectNote =(id, status)=>{
        const foundItem = notes?.find(item => item.id === id);
        setSelectedNote(foundItem);
        if (status === 'delete'){
            setDeleteToogle(true);
        }else{
            setEditToogle(true);
        }
    };

    //deselect
    const DeSelectNote =()=>{
        setDeleteToogle(false)
        setSelectedNote(null);
       
    }

    //for delete

    const DeleteItem =(id)=>{
        const fliteredNotes = notes.filter(item => item.id !== id);
        localStorage.setItem('notes', JSON.stringify(fliteredNotes));
        setDeleteToogle(false);
    }

    const SearchResult =(e)=>{
        //e.preventDefault();
        let result = notes.filter(item =>{
            if(item?.title.includes(search.toLowerCase())) return item;
        })
        setNotes(result);
    }

    useEffect(()=>{
        setNotes(notesi);
    }, [deleteToogle, editToogle])

    /* useEffect(()=>{
        if(search !== ''){
            SearchResult();
            //console.log(search, '23')
        }else{
            setNotes(notesi)
        }
    }, [search]) */



  return (
    <div className=" bg-slate-100 w-full px-5 h-screen ">
      <div className=" bg-slate-100 w-full py-20 mt-5 max-h-fit  grid justify-center grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-1">
      {/* search fields */}
      {currentUser &&
          <div className="col-span-1 pb-6 md:col-span-3 max-w-screen-md px-4 mx-auto lg:px-12 w-full">
            <div className="relative bg-white shadow-md sm:rounded-lg">
              <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full ">
                  <form onSubmit={(e)=>SearchResult(e)} class="flex items-center">
                    <label for="simple-search" class="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        onChange={(e)=>setSearch(e.target.value)}
                        value={search}
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                  <button
                    type="submit"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <svg
                      class="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Go!
                  </button>
                </div>
              </div>
            </div>
          </div>
      }

        {currentUser && notes.length === 0 && (
          <div className=" px-8 py-1 col-span-1 md:col-span-3">
            <h1 className=" text-center text-3xl font-bold text-gray-900">
              {" "}
              No Notes here
            </h1>
          </div>
        )}
        {currentUser &&
          notes &&
          notes?.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)).filter(item =>{
            if(item?.title.includes(search.toLowerCase())) return item;
            }).map((item, index) => (
              <div className="  px-8 py-2 col-span-1">
                <Card key={index} selectNote={SelectNote} item={item} />
              </div>
            ))}

        {currentUser && (
          <div className="fixed end-6 bottom-6 group">
            <div
              id="speed-dial-menu-default"
              className={`${
                toogle ? "flex" : "hidden"
              } flex-col items-center mb-4 space-y-2`}
            >
              <button
                type="button"
                data-tooltip-placement="left"
                class="flex invisible justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              >
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                  />
                </svg>
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                  />
                </svg>

                <span class="sr-only">Share</span>
              </button>
              <div
                id="tooltip-share"
                role="tooltip"
                class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Share
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>

              <button
                onClick={() => useClearStore()}
                type="button"
                data-tooltip-placement="left"
                class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              >
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                  />
                </svg>
                <span class="sr-only">Share</span>
              </button>
              <div
                id="tooltip-share"
                role="tooltip"
                class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Share
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>

              <button
                type="button"
                onClick={() => setModalToogle((prevToogle) => !prevToogle)}
                data-tooltip-placement="left"
                class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              >
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="sr-only">Creaate</span>
              </button>
              <div
                id="tooltip-copy"
                role="tooltip"
                class="absolute z-40  inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Create
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setToogle((prevToogle) => !prevToogle)}
              aria-controls="speed-dial-menu-default"
              aria-expanded="false"
              class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:rotate-45"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        )}
        <CreateNote setto={setModalToogle} modalToogle={modalToogle} />
        <DeleteConfirmation
          deleteToogle={deleteToogle}
          DeleteItem={DeleteItem}
          selectedNote={selectedNote}
          DeSelectNote={DeSelectNote}
          setDeleteToogle={setDeleteToogle}
        />
        <EditPage
          editToogle={editToogle}
          setSelectedNote={setSelectedNote}
          setEditToogle={setEditToogle}
          selectedNote={selectedNote}
        />
      </div>
    </div>
  );
}

export default DisplayPage