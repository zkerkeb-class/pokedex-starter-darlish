import React, { useState, useEffect } from 'react'
import PokemonCard from '../PokemonCard'
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Ajoute en haut du fichier
import confetti from 'canvas-confetti';



function Pokemons() {
  const [pokemonList, setPokemonList] = useState([]);
  const [editingPokemon, setEditingPokemon] = useState(null); // Pokémon en cours de modification
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [attackThreshold, setAttackThreshold] = useState('');
  const [defenseThreshold, setDefenseThreshold] = useState('');
  const [hpThreshold, setHpThreshold] = useState('');
  const navigate = useNavigate(); // Hook pour changer de page


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pokemons")
      .then((response) => setPokemonList(response.data))
      .catch((err) => console.error("Erreur lors de la récupération des Pokémon :", err));
  }, []);


   const editPokemon = (id, updatedData) => {
    axios.put(`http://localhost:3000/api/pokemons/${id}`, updatedData)
      .then((response) => {
        setPokemonList((prevList) =>
          prevList.map((p) => (p.id === id ? response.data : p))
        );
        setEditingPokemon(null);
  
        // 🎉 Animation de feu d'artifice après édition
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      })
      .catch((err) =>
        console.error("Erreur lors de la modification du Pokémon :", err)
      );
  };
  
  

  // Fonction pour supprimer un Pokémon
  const deletePokemon = (id) => {
    axios.delete(`http://localhost:3000/api/pokemons/${id}`)
      .then(() => {
        setPokemonList(pokemonList.filter(pokemon => pokemon.id !== id));
      })
      .catch(err => console.error("Erreur lors de la suppression du Pokémon :", err));
  };
  



  // Filtrer les pok
  const filteredPokemons = pokemonList.filter((pokemon) => {
    const nameMatches = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
  
    const typeMatches = selectedType
      ? pokemon.type.includes(selectedType)
      : true;
  
    const attackMatches = attackThreshold
      ? pokemon.base.Attack > parseInt(attackThreshold)
      : true;
  
    const defenseMatches = defenseThreshold
      ? pokemon.base.Defense < parseInt(defenseThreshold)
      : true;
  
    const hpMatches = hpThreshold
      ? pokemon.base.HP > parseInt(hpThreshold)
      : true;
  
    return nameMatches && typeMatches && attackMatches && defenseMatches && hpMatches;
  });
  


  return (
    <>

    
      {/* Barre de recherche */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
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
  
      {/* Filtres regroupés et stylés */}
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
        //transition: "all 0.3s ease",
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
        </select>
  
        {/* Filtrer par attaque supérieure */}
          <input
            type="number"
           placeholder="Attaque >"
           value={attackThreshold}
           onChange={(e) => setAttackThreshold(e.target.value)}
           className="input-filter"
          />
        
  
        {/* Filtrer par défense inférieure */}
        <input
          type="number"
          placeholder="Défense <"
          value={defenseThreshold}
          onChange={(e) => setDefenseThreshold(e.target.value)}
          className="input-filter"
        />
  
        {/* Filtrer par HP supérieur */}
        <input
          type="number"
          placeholder="HP >"
          value={hpThreshold}
          onChange={(e) => setHpThreshold(e.target.value)}
          className="input-filter"
        />
      </div>

  
      {/* Affichage de la liste des Pokémon */}
      <div className="pokemon-list">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card-container">
              <PokemonCard
                name={pokemon.name.french}
                types={pokemon.type}
                image={pokemon.image}
                attack={pokemon.base.Attack}
                defense={pokemon.base.Defense}
                hp={pokemon.base.HP}
              />
              <button onClick={() => deletePokemon(pokemon.id)}>Supprimer</button>
              <button onClick={() => setEditingPokemon(pokemon)}>Modifier</button>
            </div>
          ))
        ) : (
          <p style={{ 
            textAlign: "center", 
            fontSize: "90px", 
            marginTop: "110px",
            color: "red"
          }}>
            Ce pokémon n'existe pas chef !
          </p>
        )}
      </div>
  
      {/* Affichage en grand pour modifier un Pokémon */}
      {editingPokemon && (
  <div style={{
    position: "fixed",
    top: 0, 
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  }}>
    <div style={{
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "500px",
      width: "90%",
      textAlign: "center",
      position: "relative"
    }}>
      <h2>Modifier {editingPokemon.name.french}</h2>
      <img 
        src={editingPokemon.image} 
        alt={editingPokemon.name.french} 
        style={{ width: '200px', height: '200px', marginBottom: "20px" }} 
      />
      <input
        type="text"
        value={editingPokemon.name.french}
        onChange={(e) => setEditingPokemon({...editingPokemon, name: {french: e.target.value}})}
        style={{ margin: "10px", padding: "8px", width: "80%" }}
      />
      <input
        type="number"
        value={editingPokemon.base.Attack}
        onChange={(e) => setEditingPokemon({...editingPokemon, base: { ...editingPokemon.base, Attack: parseInt(e.target.value) }})}
        style={{ margin: "10px", padding: "8px", width: "80%" }}
      />
      <input
        type="number"
        value={editingPokemon.base.Defense}
        onChange={(e) => setEditingPokemon({...editingPokemon, base: { ...editingPokemon.base, Defense: parseInt(e.target.value) }})}
        style={{ margin: "10px", padding: "8px", width: "80%" }}
      />
      <input
        type="number"
        value={editingPokemon.base.HP}
        onChange={(e) => setEditingPokemon({...editingPokemon, base: { ...editingPokemon.base, HP: parseInt(e.target.value) }})}
        style={{ margin: "10px", padding: "8px", width: "80%" }}
      />
      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={() => editPokemon(editingPokemon.id, editingPokemon)} 
          style={{ marginRight: "10px", padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Enregistrer
        </button>
        <button 
          onClick={() => setEditingPokemon(null)} 
          style={{ padding: "8px 16px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
  
}

export default Pokemons;
