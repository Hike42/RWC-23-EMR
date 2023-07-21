import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

interface media {
    id: number,
    name: string
}

function Registration() {

    const [medias, setMedias] = useState<null | media[]>(null);

    const [fetchAPI, loading] = useFetch();
 
    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (formJson.password !== formJson.plainPassword) return console.error('Les deux mots de passe sont différents'); 

        const response = await fetchAPI({url: 'https://localhost:8000/api/users', method: form.method, body: JSON.stringify(formJson)});

        if (!response.ok) return console.error("Une erreur est survenue merci de réessayer ultérieurement.");
    }

    useEffect(() => {
        async function getMedias() {
            const response = await fetchAPI({url: 'https://localhost:8000/api/media', method: 'GET'});
            const data = await response.json();

            setMedias(data);
        }

        if (!medias) getMedias();
    })

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder="Email" />
                <input type="password" name="password" id="password" placeholder="Mot de passe" />
                <input type="password" name="plainPassword" id="plainPassword" placeholder="Confirmer mot de passe" />
                <input type="text" name="firstName" id="firstName" placeholder="Prénom" />
                <input type="text" name="lastName" id="lastName" placeholder="Nom" />
                <select name="media" id="media">
                    <option value="">Selectionnez un média</option>
                    {medias?.map((media: media, index: number) => (
                        <option key={index} value={"api/media/" + media.id}>{media.name}</option>
                    ))}
                </select>
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    )
}

export default Registration;