import { useState } from 'react'

import './App.css'

import { PlusIcon } from '@heroicons/react/24/solid';
// import { ShareIcon } from '@heroicons/react/24/solid';

import NewModuleModal from './components/NewModuleModal';
import ModuleTable from './components/ModuleTable';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const modules = [
    { module: 'TM101', credits: 30, grade: '1' }
  ]

  function newModuleEntry() {
    setIsModalOpen(true)
  }

  return (
    <div className='container mx-auto h-screen border-l border-r border-gray-100'>
      <div className='flex pt-5 pb-5 border-b border-gray-100'>
        <div className='flex-none w-auto pl-5 font-bold'>
          OU Degree Estimator
        </div>

        <div className='grow'>

        </div>

        <div className='flex-none w-auto pr-5'>
          <button className='p-1 bg-blue-700  hover:animate-pulse rounded' onClick={newModuleEntry}>
            <PlusIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      <div className='container mt-4 p-2'>
        <ModuleTable data={modules} />
      </div>

      <NewModuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default App
