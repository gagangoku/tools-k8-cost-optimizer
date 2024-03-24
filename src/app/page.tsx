'use client';
import { analyseCluster } from "@/lib/cluster-analyser";
import { useEffect, useState } from "react";
import SimpleLoader from "./components/SimpleLoader";
import githubIcon from '../../public/github-mark.svg';
import Image from 'next/image';


const Home = () => {
    const [kubeconfig, setKubeconfig] = useState('');
    const [details, setDetails] = useState('-');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setKubeconfig(getKubeconfigFromLS());
    }, []);

    const getKubeconfigFromLS = () => {
        return window.localStorage[LOCALSTORAGE_KEY] || '';
    };
    const saveKubeconfigToLS = (value: string) => {
        window.localStorage[LOCALSTORAGE_KEY] = value;
    };

    const onClickFn = async () => {
        if (!kubeconfig) {
            window.alert('key is must');
            return;
        }

        saveKubeconfigToLS(kubeconfig);
        setLoading(true);
        const p = await analyseCluster(kubeconfig);
        setDetails('' + p + '');
        setLoading(false);
    };

    return (
        <div>
            <link rel="icon" href="/icon2.png" type="image/png" sizes="any" />

            <main className="flex min-h-screen flex-col p-5">
                <div className="text-2xl">Kubernetes cluster &amp; cost analyser</div>
                <div className="text-sm text-gray-500">Analyse your cluster for free</div>

                <div className="flex flex-col mt-8">
                    <div className="text-gray-700"><b>Kubeconfig:</b></div>
                    <textarea className="ml-2 px-2 text-sm"
                        rows={10}
                        value={kubeconfig} onChange={(event) => setKubeconfig(event.target.value)}
                        placeholder=" paste your kubeconfig here"
                        style={{ borderBottom: '1px solid #a0a0a0', borderRadius: 0, outline: 'none', width: '50%', maxWidth: 800, color: '#505050' }} />
                </div>
                <button className="px-4 py-1 mt-4 text-sm" style={{ width: 200, background: 'blue', color: 'white', borderRadius: 5 }} onClick={onClickFn}>
                    ANALYSE CLUSTER
                </button>

                <div className="mt-8 text-sm">
                    <b>{loading ? <SimpleLoader text="Analysing" /> : details}</b>
                </div>
                <div className="flex flex-col mt-8">
                    <div className="mb-2 text-lg">FAQs</div>
                    <div className="text-sm" style={{ color: '#505050' }}>
                        <div className="">&bull; This tool uses your API key to get the current running servers & volumes</div>
                        <div className="">&bull; We only look at your current running servers, not the ones you have launched in the past</div>
                    </div>
                </div>

                <div className="mt-12">
                    <a className="text-xs flex flex-row items-center" href="https://github.com/gagangoku/tools-k8-cost-optimizer" target="_blank">
                        <Image className="mr-2" alt='github' src={githubIcon} height={20} width={20} />
                        See the source code
                    </a>
                </div>
            </main>
        </div>
    );
};

const LOCALSTORAGE_KEY = 'hetzer_key';

export default Home;
