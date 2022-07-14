import { useState } from 'react'
import Breeds from "./Breeds";
import Modal from "./Modal";
function App() {

  const [isOpen, setIsOpen] = useState(false);

  const onClickBreed = (breed) => {
    console.log("breed:", breed)
  }

  return (
    <>
      <div className="app">
        <Breeds onClickBreed={onClickBreed} />
      </div>
      <hr />
      <button onClick={() => setIsOpen(true)}>
        Click to Open Modal
      </button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div>pspsps</div>
      </Modal>
    </>
  );
}

export default App;
