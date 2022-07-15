import React, { useEffect } from "react";
import { getAll } from "../api/breeds";
import useApi from "../hooks/useApi";
import { capitalizeFirstLetter } from "../utils/textUtils";

export default function Breeds({ onClickBreed }) {

    const getAllBreeds = useApi(getAll);

    useEffect(() => {
        getAllBreeds.request();
    }, []);

    const allBreedsWithSubBreeds = (breeds) => {
        if (!breeds)
            return [];

        //flat an array of breeds
        return Object.entries(breeds.message).map(([breed, subBreeds]) => {


            //prepare sub-bread object sub-breed
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
            {getAllBreeds.loading && <p>Breeds are loading!</p>}
            {getAllBreeds.error && <p>{getAllBreeds.error}</p>}

            {allBreedsWithSubBreeds(getAllBreeds.data).map((breadItem) => (
                <a className="button button--gray button--effect  margin-10" onClick={() => onClickBreed(breadItem)} key={breadItem.label}><span>{breadItem.label}</span></a>
            ))}

        </div>
    )
}
