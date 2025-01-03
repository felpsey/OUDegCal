import { useEffect, useState } from 'react'

import './App.css'

import { Module } from './domain/Module';
import { Programme } from './domain/Programme';

import { PlusIcon } from '@heroicons/react/24/solid';

import NewModuleModal from './components/NewModuleModal';
import ModuleTable from './components/ModuleTable';
import ProgrammeResultCard from './components/ProgrammeResultCard';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programme, setProgramme] = useState<Programme>(new Programme("My Degree"));

  // Decode URI data on App load
  useEffect(() => {
    decodeSearchParams();
  }, []);

  // Update URI when modules change
  useEffect(() => {
    if (programme.modules.length > 0) {
      updateSearchParams(encodeModuleData(programme.modules));
    }
  }, [programme.modules]);

  /** Decode data from URI */
  function decodeSearchParams(): void {
    const currentUrl = new URL(document.location.href);
    const data = currentUrl.searchParams.get('data');

    if (data) {
      importModuleData(JSON.parse(atob(data)));
    }
  }

  /** Import decoded module data into the state */
  function importModuleData(unstructuredModuleData: any[]): void {
    const modules = unstructuredModuleData.map((module: any) => 
      new Module(module._code, module._credits, module._stage, module._grade)
    );

    setProgramme((currentProgramme) => new Programme(currentProgramme.title, modules));
  }

  /** Encode module data into base64 */
  function encodeModuleData(modules: Module[]): string {
    return btoa(JSON.stringify(modules));
  }

  /** Open modal for new module entry */
  function newModuleEntry(): void {
    setIsModalOpen(true);
  }

  /** Add a new module */
  function addModuleData(module: Module): void {
    setProgramme((currentProgramme) => 
      new Programme(currentProgramme.title, [...currentProgramme.modules, module])
    );
  }

  /** Update search parameters in the URL */
  function updateSearchParams(data: string): void {
    // Get current URL from browser API
    const currentUrl = new URL(document.location.href);

    // Set encoded data as 'data'
    currentUrl.searchParams.set('data', data);

    // Replace current URL without reloading the page
    history.replaceState({}, "", currentUrl.toString());
  }

  return (
    <div className='container mx-auto h-screen border-l border-r border-gray-100'>
      <div className='flex pt-5 pb-5 border-b border-gray-100'>
        <div className='flex-none w-auto pl-5 font-bold'>
          <a href="https://github.com/felpsey/ou-degree-estimator">OU Degree Estimator</a>
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
