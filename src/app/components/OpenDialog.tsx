import { PostInterface } from "@/libraries/interfaces";

interface OpenDialogProps {
  onClose: () => void;
  post: PostInterface | null;
}

const OpenDialog: React.FC<OpenDialogProps> = ({ post, onClose }) => {
  return (
    <main className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
      <div className="bg-white rounded-lg w-1/2 h-1/2">
        <h1>{post!.header}</h1>
        <button onClick={onClose} className="bg-white ">Close</button>
      </div>
    </main>
  );
};

export default OpenDialog;