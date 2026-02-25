import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const useDashboard = () => {
    const dispatch = useAppDispatch();
    const { folders, loading, error } = useAppSelector(
        (state) => state.common
    );

    const usedBytes = 622770257;
    const totalBytes = 1073741824;

    const { usedGB, totalGB, percentage } = useMemo(() => {
        const bytesToGB = (bytes: number) => bytes / (1024 * 1024 * 1024);

        const used = bytesToGB(usedBytes);
        const total = bytesToGB(totalBytes);

        return {
            usedGB: used.toFixed(2),
            totalGB: total.toFixed(2),
            percentage: ((used / total) * 100).toFixed(0),
        };
    }, [usedBytes, totalBytes]);

    return {
        folders,
        loading,
        error,
        usedGB,
        totalGB,
        percentage,
    };
};

export default useDashboard;