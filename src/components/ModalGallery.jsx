import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const ModalGallery = ({ images, handleNext, handlePrevious, imageIndex }) => {
  return (
    <div className="modal-img-container">
      <div className="modal-circle"></div>
      <div className="images">
        {images.map((image) => (
          <img
            style={{ transform: `translateX(${-100 * imageIndex}%)` }}
            src={image}
            key={image}
          />
        ))}
      </div>
      <button type="button" className="prev-btn" onClick={handlePrevious}>
        <MdOutlineArrowCircleLeft />
      </button>
      <button type="button" className="next-btn" onClick={handleNext}>
        <MdOutlineArrowCircleRight />
      </button>
    </div>
  );
};

export default ModalGallery;
