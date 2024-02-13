import { getTypeColor } from "../utils/strings";

const Grid = ({pokemon, user, lang, handleClick, key}) => {
  return (
    <section className="pokedex-grid">
      {pokemon.length > 0 ? (
        pokemon.map((poke) => (
          <div
            key={`${poke.id}-${key}`}
            className="poke-card"
            onClick={() => handleClick(poke)}
            style={{
              background: `linear-gradient(to right, ${getTypeColor(
                poke.type[0]
              )} 50%, ${getTypeColor(poke.type[1] || poke.type[0])} 50%)`,
            }}
          >
            <div className="dex-img-container">
              <div className="dex-circle"></div>
              <div
                className="img"
                style={{
                  backgroundImage: user.seen.includes(poke.id)
                    ? `url(${poke.sprites.other["official-artwork"].front_default})`
                    : "none",
                  maskImage: `url(${poke.sprites.other["official-artwork"].front_default})`,
                }}
              />
            </div>
            <p className="dex-number">#{poke.id}</p>
            <h2>
              {lang === "jp"
                ? poke.name.other[0].name
                : lang === "ko"
                ? poke.name.other[2].name
                : lang === "ch"
                ? poke.name.other[3].name
                : lang === "fr"
                ? poke.name.other[4].name
                : lang === "de"
                ? poke.name.other[5].name
                : lang === "es"
                ? poke.name.other[6].name
                : lang === "it"
                ? poke.name.other[7].name
                : poke.name.en}
            </h2>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default Grid;
