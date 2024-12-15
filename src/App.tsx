import { useState } from 'react'

import './App.css'

import { PlusIcon } from '@heroicons/react/24/solid';
// import { ShareIcon } from '@heroicons/react/24/solid';

import NewModuleModal from './components/NewModuleModal';
import ModuleTable from './components/ModuleTable';
import { Module } from './domain/Module';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);

  function newModuleEntry() {
    setIsModalOpen(true);
  }

  function addModuleData(module: Module) {
    setModules([...modules, module]);
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
        <ModuleTable modules={modules} />
      </div>

      <NewModuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onModuleAdd={addModuleData} />
    </div>
  )
}

export default App
