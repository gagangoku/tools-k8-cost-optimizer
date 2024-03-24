import * as k8s from '@kubernetes/client-node';
import { AnalyseReq } from "../../../lib/Types";


export async function POST (request: Request) {
    const req: AnalyseReq = await request.json();
    console.debug('analyseReq: ', req);

    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(req.kubeconfig || '');
    
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

        // list all namespaces
        const namespaces = await k8sApi.listNamespace();
        console.log(JSON.stringify(namespaces));

        // list pods in default namespace
        const podsRes = await k8sApi.listNamespacedPod('default');
        console.log(JSON.stringify(podsRes.body));
    } catch (err) {
        console.log('Error: ', err);
    }

    return Response.json({  });
};
