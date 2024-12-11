import { XMarkIcon } from '@heroicons/react/24/solid';

type NewModuleModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

function NewModuleModal({isOpen, onClose}: NewModuleModalProps) {
    if (!isOpen) return null;

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
            <p className="text-gray-600">Enter your module details here:</p>
            <input
              type="text"
              placeholder="Module name"
              className="mt-3 w-full p-2 border rounded"
            />
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
              onClick={onClose}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
}


export default NewModuleModal;