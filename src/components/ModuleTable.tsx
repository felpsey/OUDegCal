import { Module } from "../domain/Module";

type TableProps = {
    modules: Module[];
};
  
export default function Table({ modules }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 px-4 py-2">Module</th>
            <th className="border border-gray-200 px-4 py-2">Credits</th>
            <th className="border border-gray-200 px-4 py-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white"
            >
              <td className="border border-gray-200 px-4 py-2">{item.code}</td>
              <td className="border border-gray-200 px-4 py-2">{item.credits}</td>
              <td className="border border-gray-200 px-4 py-2">{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}