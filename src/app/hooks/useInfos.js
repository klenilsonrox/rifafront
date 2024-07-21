import { useState, useEffect } from "react";

const baseUrl = "https://rifaback.vercel.app";

const useFetchRifas = () => {
    const [rifas, setRifas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ultima,setUltima]=useState("")


    useEffect(() => {

        const fetchRifas = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${baseUrl}/api/rifas` ,{
                next:{
                    revalidate:10
                }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const ultimaRifa = data.rifas[data.rifas.length - 1];
                setUltima(ultimaRifa)
                setRifas(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };


        fetchRifas();
    }, []);



    return { rifas,loading,ultima, error };
};

export default useFetchRifas;
