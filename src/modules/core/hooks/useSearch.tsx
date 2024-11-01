import { ChangeEvent, useState } from "react";

const useSearch = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearchTerm(value);
    }

    return { searchTerm, handleInputChange };
}

export default useSearch;