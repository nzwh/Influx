interface OpenDialogProps {
  onClose: () => void;
}

const OpenDialog: React.FC<OpenDialogProps> = ({ onClose }) => {
  return (
    <main className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
      <div className="bg-white rounded-lg w-1/2 h-1/2">
        <button onClick={onClose} className="bg-white ">Close</button>
      </div>
    </main>
  );
};

export default OpenDialog;