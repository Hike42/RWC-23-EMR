import React, { useState } from "react";
import { format } from "date-fns";
import { Card, Title, Text, Flex, Callout, Icon, Grid } from "@tremor/react";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

function App() {
  const [communiques, setCommuniques] = useState<
    { title: string; file: any; date: Date }[]
  >([]);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);

  const onFileChange = (event) => {
    setNewFile(event.target.files[0]);
  };

  const uploadCommunique = () => {
    if (window.confirm("Are you sure you want to upload this file?")) {
      setCommuniques([
        { title: newTitle, file: newFile, date: new Date() },
        ...communiques,
      ]);
      setNewTitle("");
      setNewFile(null);
    }
  };

  const deleteCommunique = (index) => {
    if (window.confirm("Are you sure you want to delete this communique?")) {
      setCommuniques(communiques.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="px-12 py-12">
      <Grid numItemsLg={2}>
        <Card>
          <div className="sticky top-0 bg-white z-10">
            <Title className="ml-2 mb-4">Importer un communiqué :</Title>
            <input
              type="file"
              onChange={onFileChange}
              accept=".pdf"
              className="border p-2 rounded mr-4 gap-4"
            />
            <button
              onClick={uploadCommunique}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Upload
            </button>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Titre du document"
              className="border p-2 rounded mr-4 mt-4 w-2/5"
            />
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Choisissez le nom qui sera affiché sur le site visiteurs."
              className="mt-4"
            />
            <Callout
              className="mt-10"
              title="Attention"
              color="rose"
              icon={ExclamationCircleIcon}
            >
              <Flex>
                <img src="/src/assets/logo.svg" alt="logo" />
                <Text className="ml-4">
                  Veillez à vérifier auprès des RP (Relations publiques) si le
                  contenu de vos communiqués sont bons et traduits dans les
                  bonnes langues.
                </Text>
              </Flex>
            </Callout>
          </div>
        </Card>
        <Card className="ml-4 flex h-screen w-full">
          <div>
            {communiques.map((communique, index) => (
              <div
                key={index}
                className="border p-4 rounded mb-4 flex justify-between items-center gap-40"
              >
                <div>
                  <h3 className="font-bold mb-2">{communique.title}</h3>
                  <p>{format(communique.date, "HH:mm, dd MMMM")}</p>
                </div>
                <div>
                  <a
                    href={URL.createObjectURL(communique.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 mr-4 rounded"
                  >
                    View/Download
                  </a>
                  <button
                    onClick={() => deleteCommunique(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  );
}

export default App;
