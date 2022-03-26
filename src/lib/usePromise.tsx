import { AxiosResponse } from 'axios';
import { DependencyList, useEffect, useState } from 'react';

export default function usePromise(promiseCreator: { (): Promise<AxiosResponse<any, any>>; (): any; }, deps: DependencyList | undefined) {
    // 대기 중/완료/실패에 대한 상태 관리
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState<any>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch (e: any) {
                setError(e);
            }
            setLoading(false);
        };
        process();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return [loading, resolved, error];
}