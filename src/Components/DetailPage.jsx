
import { useNavigate, useParams } from 'react-router-dom'
import { noteCategories } from '../Helper/cate';

const DetailPage = () => {

    const {noteId} = useParams();

    const navigate = useNavigate()

    const detaliPage = JSON.parse(localStorage.getItem('notes'))?.find(item => item.id === noteId);

    const colory = noteCategories.find(stuff => stuff.title === detaliPage?.category)?.color || 'bg-gray-700';
    

  return (
    <section className=" py-20 px-4 dark:bg-gray-900">
     <div className="flex items-center space-x-4">  
          <button onClick={()=> navigate('/')}
          type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          <svg className="w-5 h-5 mr-1.5 -ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
              Back
          </button> 
      </div>
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h5 className=' text-gray-600 text-left text-sm font-semibold'>Title</h5>
      <h2 className=" border-b-2 border-b-gray-800 py-4 mb-2 text-3xl font-semibold leading-none text-gray-900 md:text-4xl dark:text-white">{detaliPage?.title}</h2>
      
      <div className=' p-2 rounded-md border-2 h-fit border-gray-100'>
          <h5 className="mb-2 py-3 font-semibold leading-none text-blue-900 dark:text-white">Description</h5>
          <p className="mb-4 text-lg text-justify leading-normal font-normal text-gray-900 sm:mb-5 dark:text-gray-400">
          {detaliPage?.description}</p>
      </div>
      <dl className="flex items-center py-8 space-x-6">
          <div>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400"></dd>
              <span className={`${colory} text-white text-xs font-medium me-2 px-2 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300`}>{detaliPage?.category}</span>
          </div>
          
      </dl>
     
  </div>
</section>
  )
}

export default DetailPage
