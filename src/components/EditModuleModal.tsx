import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { Module } from '../domain/Module';

type EditModuleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    module: Module | null; // Module to edit, null if no module is selected
    onModuleEdit: (updatedModule: Module) => void;
};

function EditModuleModal({ isOpen, onClose, module, onModuleEdit }: EditModuleModalProps) {
    if (!isOpen || !module) return null;

    // State to manage the editable fields
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [credits, setCredits] = useState(30);
    const [stage, setStage] = useState(2);
    const [grade, setGrade] = useState(1);

    // Populate state with module properties when the modal opens
    useEffect(() => {
        if (module) {
            setId(module.id);
            setCode(module.code);
            setCredits(module.credits);
            setStage(module.stage);
            setGrade(module.grade);
        }
    }, [module]);

    // Handler for saving changes
    function onSave() {
      onModuleEdit({
          _id: id,
          _code: code,
          _credits: credits,
          _stage: stage,
          _grade: grade,
      });
      onClose();
  }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full h-full md:min-w-96 md:w-1/4 md:h-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">Edit Module</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-gray-600">Code</p>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-3 w-full p-2 border rounded"
                    />

                    <p className="text-gray-600 mt-4">Credits</p>
                    <input
                        type="number"
                        value={credits}
                        onChange={(e) => setCredits(parseInt(e.target.value) || 0)}
                        className="mt-3 w-full p-2 border rounded"
                    />

                    <p className="text-gray-600 mt-4">Stage</p>
                    <select
                        className="w-20 h-9 bg-transparent border-gray-200 border rounded p-1 pl-2 pr-2 mt-2"
                        value={stage}
                        onChange={(e) => setStage(parseInt(e.target.value))}
                    >
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>

                    <p className="text-gray-600 mt-4">Grade</p>
                    <select
                        className="w-40 h-9 bg-transparent border-gray-200 border rounded p-1 pl-2 pr-2 mt-2"
                        value={grade}
                        onChange={(e) => setGrade(parseInt(e.target.value))}
                    >
                        <option value={1}>Distinction</option>
                        <option value={2}>Grade 2 Pass</option>
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
                        onClick={onSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModuleModal;