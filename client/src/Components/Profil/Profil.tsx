import React, { ChangeEvent, useState } from "react";
import { Card } from "@tremor/react";

interface Profile {
  name: string;
  role: string;
  password: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "Nom utilisateur",
    role: "Rôle utilisateur",
    password: "******",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    // Ajouter la logique pour sauvegarder les changements ici
  };

  const logout = () => {
    // Ajouter la logique pour se déconnecter ici
  };

  return (
    <div className="flex justify-center w-screen overflow-x-hidden">
      <Card className="w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 m-4">
        <h1 className="text-2xl font-bold mb-8">Mon Profil</h1>
        {isEditing ? (
          <div>
            <label className="block text-sm font-bold mb-4">
              Nom:
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
            </label>
            <label className="block text-sm font-bold mb-2">
              Mot de passe:
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
            </label>
            <button
              onClick={toggleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sauvegarder
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">Nom: {profile.name}</p>
            <p className="mb-4">Rôle: {profile.role}</p>
            <p className="mb-6">Mot de passe: {profile.password}</p>
            <button
              onClick={toggleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Modifier
            </button>
          </div>
        )}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:text-white focus-outline-none w-full mt-4"
        >
          Se déconnecter
        </button>
      </Card>
    </div>
  );
};

export default ProfilePage;
