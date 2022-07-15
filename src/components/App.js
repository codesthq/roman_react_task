import { useState } from 'react'
import BreedImagePreview from './BreedImagePreview';
import Breeds from "./Breeds";
import Modal from "./Modal";
function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [currentBreed, setCurrentBreed] = useState({});

  const onClickBreed = (breed) => {
    console.log("breed:", breed)

    setCurrentBreed(breed)
    setIsOpen(true)
  }

  return (
    <>

      <div className="app">
        <h1>Choose your favorite breed</h1>
        <Breeds onClickBreed={onClickBreed} />
      </div>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <BreedImagePreview content={currentBreed} />
      </Modal>
    </>
  );
}

export default App;
