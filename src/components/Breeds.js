import React, { useEffect } from "react";
import { getAll } from "../api/breeds";
import useApi from "../hooks/useApi";
import { capitalizeFirstLetter } from "../utils/textUtils";

export default function Breeds({ onClickBreed }) {

    const { data, error, loading, request } = useApi(getAll);

    useEffect(() => {
        request();
    }, [request]);

    const allBreedsWithSubBreeds = (breeds) => {
        if (!breeds)
            return [];

        //flat an array of breeds
        return Object.entries(breeds.message).map(([breed, subBreeds]) => {

            //prepare sub-breed object sub-breed
            subBreeds = subBreeds.map(subBreed => {
                return {
                    // need for buton label
                    label: `${capitalizeFirstLetter(subBreed)} ${capitalizeFirstLetter(breed)}`,
                    // need for api endpoint
                    breed: breed,
                    subBreed: subBreed
                }
            })

            //return breed and sub-breed object
            return [{
                label: capitalizeFirstLetter(breed),
                breed: breed,
                subBreed: null
            }].concat(subBreeds)
        }
        ).flat()
    }

    return (
        <div>
            {loading && <p>Breeds are loading!</p>}
            {error && <p>{error}</p>}

            {allBreedsWithSubBreeds(data).map((breedItem) => (
                <button className="button button--gray button--effect  margin-10" onClick={() => onClickBreed(breedItem)} key={breedItem.label}><span>{breedItem.label}</span></button>
            ))}

        </div>
    )
}
