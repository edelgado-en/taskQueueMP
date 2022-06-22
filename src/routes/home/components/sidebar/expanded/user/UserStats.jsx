import { DocumentIcon, TranslateIcon } from '@heroicons/react/outline'

const users = [
    {
        id: 1,
        userName: 'flardizabal',
        name: 'Florencia Lardizabal'
    },
    {
        id: 2,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 3,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 4,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 5,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 6,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 7,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 8,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 9,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 10,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    }/* ,
    {
        id: 11,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 12,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 13,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 14,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 15,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 16,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 17,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    },
    {
        id: 18,
        userName: 'agironacci',
        name: 'Alejandra Gironacci'
    }  */
    
]
  
const UsersStats = () => {
    return (
      <nav className="h-full overflow-y-auto py-7">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
            <li className="bg-rose-50 my-2">
                <div className="bg-rose-50 text-rose-700  relative px-3 py-3 flex items-center space-x-3 hover:bg-rose-100 focus-within:ring-2 focus-within:ring-inset">
                    <div className="basis-[70%] min-w-0">
                        <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" />
                        <p className="text-xs font-medium text-rose-900">Not Assigned</p>
                        </a>
                    </div>
                    <div className="basis-[30%] text-right">
                        <div className="text-xs">
                            <DocumentIcon className="inline-flex h-3 w-3 " /><span className="ml-1">5,678</span>
                        </div>
                    </div>
                </div>
            </li>
            {users.map((user) => (
            <li key={user.id} className="bg-white my-2">
                <div className="relative px-3 py-3 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <div className="basis-[70%] min-w-0">
                        <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" />
                        <p className="text-xs font-medium text-gray-900">{user.userName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.name}</p>
                        </a>
                    </div>
                    <div className="basis-[30%] text-right">
                        <div className="text-xs">
                            <DocumentIcon className="inline-flex h-3 w-3 text-blue-500" /><span className="ml-1">5,678</span>
                        </div>
                        <div className="text-xs mt-3">
                            <TranslateIcon className="inline-flex h-3 w-3 text-green-500" /><span className="ml-1">2,641</span>
                        </div>
                    </div>
                </div>
            </li>
            ))}
        </ul>
        <div className="py-16"></div>
      </nav>
    )
}

export default UsersStats;