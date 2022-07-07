const messages = [
  {
    id: 1,
    subject: "ProTranslating",
    sender: "Patricio Valenti",
    time: "1d",
    datetime: "2021-01-27T16:35",
    preview:
      "(Notified MP) Task Returned as Error-Page.",
  },
  {
    id: 2,
    subject: "ProTranslating",
    sender: "Patricio Valenti",
    time: "1d",
    datetime: "2021-01-27T16:35",
    preview:
      "(Notified MP) Task Returned as Error-Page.",
   },
];

const TaskComment = () => {
  return (
    <ul role="list" className="divide-y divide-gray-200 mt-3">
      {messages.map((message) => (
        <li
          key={message.id}
          className="relative bg-white py-3 px-4 hover:bg-gray-50 focus-within:ring-2
                     focus-within:ring-inset focus-within:ring-blue-600"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <a href="#" className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-900 truncate">
                  {message.sender}
                </span>
                <span className="text-sm text-gray-500 truncate ml-3">
                  {message.subject}
                </span>
              </a>
            </div>
            <time
              dateTime={message.datetime}
              className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
            >
              {message.time}
            </time>
          </div>
          <div className="mt-1">
            <p className="line-clamp-2 text-sm text-gray-600">
              {message.preview}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskComment;
