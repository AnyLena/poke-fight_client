import { forwardRef, useState } from "react";
import { Dialog, DialogContent, Grow } from "@mui/material";
import { getTypeColor } from "../utils/strings";
import "../styles/PokemonModal.css";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const Transition = forwardRef((props, ref) => (
  <Grow direction="down" ref={ref} {...props} />
));

function PokemonModal({ open, handleClose, selectedPokemon }) {
  const [imageIndex, setImageIndex] = useState(0);

  const images = selectedPokemon
    ? [
        selectedPokemon.sprites.other["official-artwork"].front_default,
        selectedPokemon.sprites.front_default,
        selectedPokemon.sprites.other.dream_world.front_default,
        selectedPokemon.sprites.other.home.front_default,
        selectedPokemon.sprites.other.showdown.front_default,
      ]
    : [];

  const handleNext = () => {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  };

  const handlePrevious = () => {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ "& .MuiPaper-root": { borderRadius: "30px" } }}
    >
      <DialogContent sx={{ p: 0 }}>
        {selectedPokemon && (
          <div
            className="pokemon-modal"
            style={{
              background: `linear-gradient(to right, ${getTypeColor(
                selectedPokemon.type[0]
              )} 50%, ${getTypeColor(
                selectedPokemon.type[1] || selectedPokemon.type[0]
              )} 50%)`,
            }}
          >
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
              <button className="prev-btn" onClick={handlePrevious}>
                <MdOutlineArrowCircleLeft />
              </button>
              <button className="next-btn" onClick={handleNext}>
                <MdOutlineArrowCircleRight />
              </button>
            </div>

            <div className="modal-info">
              <p className="dex-number">#{selectedPokemon.id}</p>
              <h2>
                {selectedPokemon.name.en.charAt(0).toUpperCase() +
                  selectedPokemon.name.en.slice(1)}
              </h2>
              <p className="stat">
                {selectedPokemon.type.map((type) => (
                  <span key={type} style={{ background: getTypeColor(type) }}>
                    {type.toUpperCase()}
                  </span>
                ))}
              </p>
              <div className="modal-stats">
                <p className="text">HP</p>
                <p className="stat">{selectedPokemon.base.hp}</p>
                <p className="text">Attack</p>
                <p className="stat">{selectedPokemon.base.attack}</p>
                <p className="text">Defense</p>
                <p className="stat">{selectedPokemon.base.defense}</p>
                <p className="text">Sp. Attack</p>
                <p className="stat">{selectedPokemon.base.special_attack}</p>
                <p className="text">Sp. Defense</p>
                <p className="stat">{selectedPokemon.base.special_defense}</p>
                <p className="text">Speed</p>
                <p className="stat">{selectedPokemon.base.speed}</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PokemonModal;
