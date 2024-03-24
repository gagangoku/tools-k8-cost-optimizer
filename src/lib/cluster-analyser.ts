import { AnalyseReq, AnalyseRsp } from '@/lib/Types';


export const analyseCluster = async (kubeconfig: string) => {
    const obj: AnalyseReq = {kubeconfig};
    const rsp = await fetch('/api/analyse', {method:'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj)});
    const ret: AnalyseRsp = await rsp.json();
    console.log('ret: ', ret);

    return '';
};
