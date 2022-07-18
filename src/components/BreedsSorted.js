import { useEffect, useMemo } from "react";
import useApi from "../hooks/useApi";
import { getAll } from "../api/breeds";
import { capitalizeFirstLetter } from "../utils/textUtils";
import BreedButton from "./BreedButton";
import { v4 as uuidv4 } from 'uuid';

export default function Breeds({ onClickBreed }) {

    const { data: breeds, error, loading, request } = useApi(getAll);

    useEffect(() => {
        request();
    }, [request]);

    const allBreedsWithSubBreeds = useMemo(
        () => {
            if (!breeds)
                return [];

            const initialBreedsList = Object.entries(breeds.message)

            const breedsList = initialBreedsList.map(([breed, subBreeds]) => {
                //prepare sub-breed object sub-breed
                subBreeds = subBreeds.map(subBreed => {
                    return {
                        // need for buton label
                        label: `${capitalizeFirstLetter(subBreed)} ${capitalizeFirstLetter(breed)}`,
                        // need for api  
                        breed,
                        subBreed
                    }
                })

                //return breed and sub-breed object
                return [{
                    label: capitalizeFirstLetter(breed),
                    breed,
                    subBreed: null
                }].concat(subBreeds)
            })

            const sortedBreedsLlist = breedsList.reduce((r, breeds) => {
                let letter = breeds[0].breed[0];

                if (!r[letter])
                    r[letter] = { letter, breeds: [breeds] }
                else
                    r[letter].breeds.push(breeds);

                return r;
            }, {})

            return Object.values(sortedBreedsLlist);
        }, [breeds])

    return (
        <div>
            {loading && <p>Breeds are loading!</p>}
            {error && <p>{error}</p>}

            {allBreedsWithSubBreeds.map((breedItem) => (
                <div key={breedItem.letter}>
                    <div className="breeds-letter">{breedItem.letter}</div>
                    <div className="breeds-letter-items">
                        {breedItem.breeds.map((breeds) => (
                            <div className="breeds-buttons" key={uuidv4()}>
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
