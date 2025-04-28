import React, { useState, useEffect } from "react";

const typeColors = {
  "Normal": "#A8A77A",
  "Fighting": "#C22E28",
  "Flying": "#A98FF3",
  "Poison": "#A33EA1",
  "Ghost": "#735797",
  "Rock": "#B6A136",
  "Bug": "#A6B91A",
  "Ground": "#E2BF65",
  "Steel": "#B7B7CE",
  "Fire": "#EE8130",
  "Water": "#6390F0",
  "Grass": "#7AC74C",
  "Electric": "#F7D02C",
  "Psychic": "#F95587",
  "Ice": "#96D9D6",
  "Dragon": "#6F35FC",
  "Dark": "#705746",
  "Fairy": "#D685AD",
};

const PokemonCard = ({ name, types, image, attack, defense, hp }) => {
  const [currentHP, setCurrentHP] = useState(hp);
  const [isDead, setIsDead] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // 🔥

  useEffect(() => {
    if (currentHP <= 0 && !isDead) {
      setIsDead(true);

      // Après 2 secondes, cacher la carte
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  }, [currentHP, isDead]);

  const handleAttack = () => {
    setCurrentHP(currentHP - 10);
  };

  if (!isVisible) {
    // Si la carte n'est plus visible, on ne retourne rien 🔥
    return null;
  }

  return (
    <div
      style={{
        background: isDead
          ? "linear-gradient(to right, #ff0000, #8b0000)" // fond rouge quand mort
          : `linear-gradient(to right, ${typeColors[types[0]]}, ${types[1] ? typeColors[types[1]] : typeColors[types[0]]})`,
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transition: "all 0.5s ease",
        filter: isDead ? "grayscale(100%)" : "none",
        transform: isDead ? "scale(0.9)" : "scale(1)",
        opacity: isDead ? 0.6 : 1, // baisse l'opacité quand mort
      }}
    >
      <h1>{name}</h1>

      <img
        src={image}
        alt={name}
        style={{ width: "150px" }}
      />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
        {types.map((type) => (
          <span
            key={type}
            style={{
              backgroundColor: typeColors[type] || "#000",
              color: "white",
              padding: "4px 10px",
              borderRadius: "12px",
              fontWeight: "bold",
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            {type}
          </span>
        ))}
      </div>

      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
      <p>HP: {currentHP}</p>
      <button onClick={handleAttack}>Attack</button>
    </div>
  );
};

export default PokemonCard;
