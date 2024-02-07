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
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <h2>{selectedPokemon.name}</h2>
            <p>No. {selectedPokemon.id}</p>
            <p>Type: {selectedPokemon.type.map((type) => type + " ")}</p>
            <p>HP: {selectedPokemon.base.hp}</p>
            <p>Attack: {selectedPokemon.base.attack}</p>
            <p>Defense: {selectedPokemon.base.defense}</p>
            <p>Sp. Attack: {selectedPokemon.base.sp_attack}</p>
            <p>Sp. Defense: {selectedPokemon.base.sp_defense}</p>
            <p>Speed: {selectedPokemon.base.speed}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PokemonModal;
