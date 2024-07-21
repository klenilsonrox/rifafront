import React, { useEffect, useState } from 'react';
import { getuser } from '../actions/getUSer';
import Link from 'next/link';
import { getToken } from '../actions/getToken';
import { baseUrl } from '../../../baseUrl';

const Rifas = () => {
  const [rifas, setRifa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleNumbers, setVisibleNumbers] = useState([]);

  async function buscarUser() {
    try {
      const token = await getToken();
      const userBuscado = await getuser();

      const response = await fetch(`${baseUrl}/rifas/usuario/${userBuscado._id}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      
  
      const rifasOrdenadas = data.rifas.map(rifa => ({
        ...rifa,
        numeros_comprados: rifa.numeros_comprados.sort((a, b) => a.numero - b.numero)
      }));

      setRifa(rifasOrdenadas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarUser();
  }, []);

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const toggleNumbersVisibility = (rifaId) => {
    setVisibleNumbers(prevState =>
      prevState.includes(rifaId)
        ? prevState.filter(id => id !== rifaId)
        : [...prevState, rifaId]
    );
  };


  return (
    <div className='bg-gray-900 flex justify-center items-center'>
      <div className="bg-gray-800 p-2 max-w-4xl mx-auto flex flex-col gap-6 ">
        {rifas && rifas.map(rif => (
          <div key={rif._id} className='bg-gray-700 p-4 rounded-lg '>
            <Link href="/" className='flex gap-2'>
              <img src={rif.urlImage} alt="" className='w-32 h-32 object-cover rounded-lg' />
              <div>
                <h2 className='text-xl font-bold text-white'>{rif.nome}</h2>
                <p className='text-sm text-gray-400'>Data do sorteio: {formatDateToBrazilian(rif.data_sorteio)} às 19:00 hrs</p>
                <p className='text-lg font-medium text-yellow-400'>R$ {Number(rif.preco)}</p>
              </div>
            </Link>
            <div>
              <button
                className='bg-yellow-500 hover:bg-yellow-600 transition-all rounded-md mt-4 px-6 py-2 text-black font-bold comprar-rifa'
                onClick={() => toggleNumbersVisibility(rif._id)}>
               meus números
              </button>
              <div className={`grid grid-cols-5 mt-4 gap-2 max-h-[200px] overflow-y-scroll p-2 bg-gray-600 rounded-md ${visibleNumbers.includes(rif._id) ? '' : 'hidden'}`}>
                {rif.numeros_comprados.length === 0 && <p className="col-span-5 text-center text-white">Você não comprou nenhuma rifa</p>}
                {rif.numeros_comprados.map(num => (
                  <p key={num.numero} className='bg-yellow-500 text-center text-black font-bold rounded-md p-1 text-xs'>{num.numero}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rifas;
