import { searchData } from "../../store/slices/commonSlice";
import { useAppDispatch } from "../../store/hooks";


const useSearch = () => {
    const dispatch = useAppDispatch();

    const handleSearch = () => {
        dispatch(searchData("Confidential"));
    };
    return {
        handleSearch
    }
}

export default useSearch;