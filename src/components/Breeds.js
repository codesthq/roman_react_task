import React, { useEffect } from "react";
import breedsApi from "../api/breeds";
import useApi from "../hooks/useApi";
import { capitalizeFirstLetter } from "../utils/textUtils";

export default function Breeds({ onClickBreed }) {

    const getAllBreeds = useApi(breedsApi.getAll);

    useEffect(() => {
        getAllBreeds.request();
    }, []);

    const allBreedsWithSubBreeds = (breeds) => {
        if (!breeds)
            return [];
        //flat the array of breeds
        return Object.entries(breeds.message).map((breedArray) => {
            const breed = capitalizeFirstLetter(breedArray[0])
            const subBreeds = breedArray[1].map(subBreed => `${capitalizeFirstLetter(subBreed)} ${breed}`)
            return [breed].concat(subBreeds)
        }
        ).flat()
    }

    return (
        <div>
            {getAllBreeds.loading && <p>Comments are loading!</p>}
            {getAllBreeds.error && <p>{getAllBreeds.error}</p>}

            {allBreedsWithSubBreeds(getAllBreeds.data).map((bread) => (
                <button onClick={() => onClickBreed(bread)} className="breedButton" key={bread}>{bread}</button>
            ))}

        </div>
    )
}
