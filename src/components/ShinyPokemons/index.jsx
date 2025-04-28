import React, { useState } from 'react';
import shinyPokemonsData from '../../data/shinyPokemons';
import PokemonCard from '../PokemonCard';
import { Link } from 'react-router-dom';
import './ShinyPokemons.css';
import confetti from 'canvas-confetti';

function ShinyPokemons() {
  const [shinyPokemons, setShinyPokemons] = useState(shinyPokemonsData);
  const [editingPokemon, setEditingPokemon] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [attackThreshold, setAttackThreshold] = useState('');
  const [defenseThreshold, setDefenseThreshold] = useState('');
  const [hpThreshold, setHpThreshold] = useState('');

  // Supprimer un Pokémon shiny
  const deleteShinyPokemon = (id) => {
    setShinyPokemons(shinyPokemons.filter(pokemon => pokemon.id !== id));
  };

  // Modifier un Pokémon shiny
  const editShinyPokemon = (id, updatedData) => {
    setShinyPokemons(prevList =>
      prevList.map(p => (p.id === id ? updatedData : p))
    );
    setEditingPokemon(null); // Quitter l'édition

    // 🎉 Ajouter confettis lors de l'enregistrement
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Filtrer les Pokémons shiny
  const filteredShinyPokemons = shinyPokemons.filter((pokemon) => {
    const nameMatches = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatches = selectedType ? pokemon.type.includes(selectedType) : true;
    const attackMatches = attackThreshold ? pokemon.base.Attack > parseInt(attackThreshold) : true;
    const defenseMatches = defenseThreshold ? pokemon.base.Defense < parseInt(defenseThreshold) : true;
    const hpMatches = hpThreshold ? pokemon.base.HP > parseInt(hpThreshold) : true;

    return nameMatches && typeMatches && attackMatches && defenseMatches && hpMatches;
  });

  return (
    <div className="page-shiny">
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1>✨ Bienvenue dans la page des Pokémon Shinys ✨</h1>

        <Link to="/">
          <button style={{
            backgroundColor: "#00cfff",
            color: "black",
            padding: "10px 20px",
            borderRadius: "10px",
            marginTop: "20px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Revenir aux Pokémon normaux
          </button>
        </Link>
      </div>

      {/* Barre de recherche */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Rechercher un Pokémon shiny..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            transition: "all 0.3s ease",
          }}
        />
      </div>

      {/* Filtres */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "10px",
        marginBottom: "30px",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
      }}>
        
        {/* Filtrer par type */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="select-filter"
        >
          <option value="">Tous les types</option>
          <option value="Fire">Feu</option>
          <option value="Water">Eau</option>
          <option value="Grass">Plante</option>
          <option value="Poison">Poison</option>
          <option value="Electric">Électrique</option>
          <option value="Psychic">Psy</option>
          <option value="Ice">Glace</option>
          <option value="Flying">Vol</option>
          <option value="Normal">Normal</option>
          <option value="Bug">Insecte</option>
          <option value="Ground">Sol</option>
          <option value="Fairy">Fée</option>
        </select>

        {/* Filtres numériques */}
        <input
          type="number"
          placeholder="Attaque >"
          value={attackThreshold}
          onChange={(e) => setAttackThreshold(e.target.value)}
          className="input-filter"
        />
        <input
          type="number"
          placeholder="Défense <"
          value={defenseThreshold}
          onChange={(e) => setDefenseThreshold(e.target.value)}
          className="input-filter"
        />
        <input
          type="number"
          placeholder="HP >"
          value={hpThreshold}
          onChange={(e) => setHpThreshold(e.target.value)}
          className="input-filter"
        />
      </div>

      {/* Liste filtrée */}
      <div className="pokemon-list">
        {filteredShinyPokemons.length > 0 ? (
          filteredShinyPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card-container">
              <PokemonCard
                name={pokemon.name.french}
                types={pokemon.type}
                image={pokemon.image}
                attack={pokemon.base.Attack}
                defense={pokemon.base.Defense}
                hp={pokemon.base.HP}
              />
              <button onClick={() => deleteShinyPokemon(pokemon.id)}>Supprimer</button>
              <button onClick={() => setEditingPokemon(pokemon)}>Modifier</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "90px", marginTop: "110px", color: "red" }}>
            Aucun shiny trouvé !
          </p>
        )}
      </div>

      {/* Formulaire de modification */}




      {editingPokemon && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    zIndex: 1000,
    width: '300px', // 👉 petite taille !
    maxWidth: '90%',
    textAlign: 'center',
  }}>
    <h2 style={{ marginBottom: '10px' }}>Modifier {editingPokemon.name.french}</h2>
    <div>
      <img
        src={editingPokemon.image}
        alt={editingPokemon.name.french}
        style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
      />
      <input
        type="text"
        value={editingPokemon.name.french}
        onChange={(e) => setEditingPokemon({ ...editingPokemon, name: { french: e.target.value } })}
        style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="number"
        value={editingPokemon.base.Attack}
        onChange={(e) => setEditingPokemon({ ...editingPokemon, base: { ...editingPokemon.base, Attack: parseInt(e.target.value) } })}
        style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="number"
        value={editingPokemon.base.Defense}
        onChange={(e) => setEditingPokemon({ ...editingPokemon, base: { ...editingPokemon.base, Defense: parseInt(e.target.value) } })}
        style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="number"
        value={editingPokemon.base.HP}
        onChange={(e) => setEditingPokemon({ ...editingPokemon, base: { ...editingPokemon.base, HP: parseInt(e.target.value) } })}
        style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
        <button
          onClick={() => editShinyPokemon(editingPokemon.id, editingPokemon)}
          style={{
            backgroundColor: '#00cfff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Enregistrer
        </button>
        <button
          onClick={() => setEditingPokemon(null)}
          style={{
            backgroundColor: '#f44336',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
}

export default ShinyPokemons;
