import { forwardRef, useState } from "react";
import { Dialog, DialogContent, Grow } from "@mui/material";
import { getTypeColor } from "../utils/strings";
import "../styles/PokemonModal.css";

import ModalGallery from "./ModalGallery";

const Transition = forwardRef((props, ref) => (
  <Grow direction="down" ref={ref} {...props} />
));

function PokemonModal({ open, handleClose, selectedPokemon, lang }) {
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
            <ModalGallery images={images} imageIndex={imageIndex} handleNext={handleNext} handlePrevious={handlePrevious}/>

            <div className="modal-info">
              <p className="dex-number">#{selectedPokemon.id}</p>
              <h2>
              {lang === "jp"
                ? selectedPokemon.name.other[0].name
                : lang === "ko"
                ? selectedPokemon.name.other[2].name
                : lang === "ch"
                ? selectedPokemon.name.other[3].name
                : lang === "fr"
                ? selectedPokemon.name.other[4].name
                : lang === "de"
                ? selectedPokemon.name.other[5].name
                : lang === "es"
                ? selectedPokemon.name.other[6].name
                : lang === "it"
                ? selectedPokemon.name.other[7].name
                : selectedPokemon.name.other[8].name}
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
