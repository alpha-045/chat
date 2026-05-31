import { MessageCircle } from "lucide-react";

export default function Nochat() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center p-8   max-w-md">
        <div className="flex justify-center mb-4"><MessageCircle size={50} /></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to my chat
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select a contact to start messaging
        </p>
      </div>
    </div>
  );
}