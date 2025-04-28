import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profil</h2>
      {user ? (
        <>
          <p>Email : {user.email}</p>
          <button onClick={logout}>Se déconnecter</button>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default Profile;
