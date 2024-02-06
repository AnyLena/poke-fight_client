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
              src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fpokemon-logo-png-pokemon-logo-text-png-1428-1390.png&f=1&nofb=1&ipt=a6000bf82b5cc75d945e6609d6d6d22cf695d813fee1fab31ffb2395aeb6d40a&ipo=images"
              alt={selectedPokemon.name.english}
            />
            <h2>{selectedPokemon.name.english}</h2>
            <p>No. {selectedPokemon.id}</p>
            <p>Type: {selectedPokemon.type.map((type) => type + " ")}</p>
            <p>HP: {selectedPokemon.base.HP}</p>
            <p>Attack: {selectedPokemon.base.Attack}</p>
            <p>Defense: {selectedPokemon.base.Defense}</p>
            <p>Sp. Attack: {selectedPokemon.base["Sp. Attack"]}</p>
            <p>Sp. Defense: {selectedPokemon.base["Sp. Defense"]}</p>
            <p>Speed: {selectedPokemon.base.Speed}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PokemonModal;
