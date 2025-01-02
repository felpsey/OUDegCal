import { useEffect, useState } from 'react'

import './App.css'

import { PlusIcon } from '@heroicons/react/24/solid';
// import { ShareIcon } from '@heroicons/react/24/solid';

import NewModuleModal from './components/NewModuleModal';
import ModuleTable from './components/ModuleTable';
import ProgrammeResultCard from './components/ProgrammeResultCard';

import { Module } from './domain/Module';
import { Programme } from './domain/Programme';


function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [programme, setProgramme] = useState<Programme>(new Programme("Example programme"));

  useEffect(() => {
    if(!programme.modules.current && (programme.modules.length != 0)) {
      let encodedModuleData = encodeModuleData(programme.modules);

      updateSearchParams(encodedModuleData);
    }
  }), [programme];

  function decodeSearchParams(): void {
    let currentUrl: URL = new URL(document.location.href);
    let data: string|null = currentUrl.searchParams.get('data');

    if (data) {
      importModuleData(JSON.parse(atob(data)));
    }
  }

  function importModuleData(unstructuredModuleData: []): void {
    let modules = unstructuredModuleData.map((module: any) => {
      return new Module(module._code, module._credits, module._stage, module._grade);
    });

    modules.forEach(module => {
      addModuleData(module)
    });
  }

  function encodeModuleData(modules): string {
    // Convert modules array to JSON then base64 encode
    return btoa(JSON.stringify(modules));
  }

  function newModuleEntry(): void {
    setIsModalOpen(true);
  }

  function addModuleData(module: Module): void {
    setProgramme((currentProgramme) => {
        // Create a new array with the added module
        const updatedModules = [...currentProgramme.modules, module];

        // Return a new Programme instance with updated modules
        return new Programme(currentProgramme.title, updatedModules);
    });
  }

  function updateSearchParams(data): void {
    // Fetch the currentl URL, this will change each time this method is called
    let currentUrl = new URL(document.location.href);

    // Set encoded data on URL object on 'data' property
    currentUrl.searchParams.set('data', data);
    
    // Append encoded params to URI without reloading page
    history.replaceState({}, "", currentUrl.toString());
  }

  decodeSearchParams();

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
        <ModuleTable modules={programme.modules} />
      </div>

      <div className='container mt-4 p-2'>
        <ProgrammeResultCard programme={programme} />
      </div>

      <NewModuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onModuleAdd={addModuleData} />
    </div>
  )
}

export default App
