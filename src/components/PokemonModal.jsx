import { forwardRef } from "react";
import { Dialog, DialogContent, Grow } from "@mui/material";
import { getTypeColor } from "../utils/strings";
import "../styles/PokemonModal.css";

const Transition = forwardRef((props, ref) => (
  <Grow direction="down" ref={ref} {...props} />
));

function PokemonModal({ open, handleClose, selectedPokemon }) {
  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
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
              <img
                src={
                  selectedPokemon.sprites.other["official-artwork"]
                    .front_default
                }
                alt={selectedPokemon.name}
              />
            </div>
            <div className="modal-info">
              <p className="dex-number">#{selectedPokemon.id}</p>
              <h2>
                {selectedPokemon.name.charAt(0).toUpperCase() +
                  selectedPokemon.name.slice(1)}
              </h2>
                <p className="stat">{selectedPokemon.type.map((type) => (<span style={{ background: getTypeColor(type) }}>{type.toUpperCase()}</span>))}</p>
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
