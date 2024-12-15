import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Module } from '../domain/Module';

type NewModuleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onModuleAdd: (module: Module) => void;
}

function NewModuleModal({isOpen, onClose, onModuleAdd}: NewModuleModalProps) {
    if (!isOpen) return null;

    const [code, setCode] = useState('');
    const [credits, setCredits] = useState(30);
    const [stage, setStage] = useState(2);
    const [grade, setGrade] = useState(1);

    function onAdd() {
      onModuleAdd(new Module(code, credits, stage, grade));
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-1/3">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">New Module Entry</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
  
          <div className="p-4">
            <p className="text-gray-600">Code</p>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="mt-3 w-full p-2 border rounded"
            />

            <p className="text-gray-600">Credits</p>
            <input
              type="text"
              value={credits}
              onChange={e => setCredits(parseInt(e.target.value))}
              className="mt-3 w-full p-2 border rounded"
            />

            <p className="text-gray-600">Stage</p>
            <select value={stage} onChange={e => setStage(parseInt(e.target.value))}>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>

            <p className="text-gray-600">Grade</p>
            <select value={grade} onChange={e => setGrade(parseInt(e.target.value))}>
              <option value={1}>Distinction</option>
              <option value={2}>Merit</option>
              <option value={3}>Grade 3 Pass</option>
              <option value={4}>Grade 4 Pass</option>
            </select>
          </div>

          <div className="flex justify-end p-4 border-t">
            <button
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded"
              onClick={onAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
}


export default NewModuleModal;