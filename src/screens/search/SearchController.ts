import { searchData } from "../../store/slices/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";


const useSearch = () => {
    const { searchAllData, success, error } = useAppSelector(
        (state) => state.common
    );
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState("")

    const handleSearch = () => {
        dispatch(searchData(searchText));
    };
    return {
        handleSearch,
        searchText,
        setSearchText,
        searchAllData
    }
}

export default useSearch;