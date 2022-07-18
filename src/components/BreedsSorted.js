import React, { useEffect } from "react";
import { getAll } from "../api/breeds";
import useApi from "../hooks/useApi";
import { capitalizeFirstLetter } from "../utils/textUtils";
import BreedButton from "./BreedButton";

export default function Breeds({ onClickBreed }) {

    const getAllBreeds = useApi(getAll);

    useEffect(() => {
        getAllBreeds.request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const allBreedsWithSubBreeds = (breeds) => {
        if (!breeds)
            return [];

        const obj = Object.entries(breeds.message).map(([breed, subBreeds]) => {

            //prepare sub-breed object sub-breed
            subBreeds = subBreeds.map(subBreed => {
                return {
                    // need for buton label
                    label: `${capitalizeFirstLetter(subBreed)} ${capitalizeFirstLetter(breed)}`,
                    // need for api  
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
        ).reduce((r, breeds) => {

            let letter = breeds[0].breed[0];

            if (!r[letter]) r[letter] = { letter, breeds: [breeds] }

            else r[letter].breeds.push(breeds);

            return r;

        }, {})

        return Object.values(obj);
    }

    return (
        <div>
            {getAllBreeds.loading && <p>Breeds are loading!</p>}
            {getAllBreeds.error && <p>{getAllBreeds.error}</p>}

            {allBreedsWithSubBreeds(getAllBreeds.data).map((breedItem) => (
                <div key={breedItem.letter}>
                    <div className="breeds-letter">{breedItem.letter}</div>
                    <div className="breeds-letter-items">
                        {breedItem.breeds.map((breeds, idx) => (
                            <div className="breeds-buttons" key={breedItem.letter + idx}>
                                {
                                    breeds.map((breed) => (
                                        <BreedButton content={breed} onClick={onClickBreed} key={breed.label} />
                                    ))
                                }
                            </div>
                        ))
                        }
                    </div>
                </div>
            ))}

        </div>
    )
}
