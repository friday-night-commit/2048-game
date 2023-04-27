export default function ChatList ( ){
  return (
    <div className="container mx-auto mt-12">
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Темы
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
           256
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Сообщений
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            12565
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Участников
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            325
          </div>
        </div>
      </div>
    </div>
  )
}
