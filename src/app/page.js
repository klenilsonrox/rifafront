'use client'
import React from 'react';
import useFetchRifas from './hooks/useInfos';
import Link from 'next/link';
import Header from './components/Header';
import Loading from './components/Loading';



const Page = () => {
  const { rifas, ultima, loading } = useFetchRifas();

  const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg">
      {loading && <Loading /> }
      <Header />
      <h1 className='text-center mb-6 text-3xl font-bold text-white'>Campanhas</h1>
      {ultima && (
        <Link href={`/rifas/${ultima._id}`} className='mb-6 flex flex-col bg-gray-900 rounded-lg shadow-lg'>
          <img src={ultima.urlImage} alt="" className='w-full max-h-[300px] object-cover rounded-t-lg' />
          <div className='p-4'>
            {!ultima.sorteada ? (
              <button className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all'>
                Adquira já
              </button>
            ) : (
              <p className='bg-gray-700 text-white px-4 py-2 rounded-md text-center'>
                Concluído
              </p>
            )}
            <h2 className='text-xl font-bold text-white mt-2'>{ultima.nome}</h2>
            <p className='text-sm text-gray-400 mt-1'>Data do sorteio: {formatDateToBrazilian(ultima.data_sorteio)}</p>
            {ultima.bilhetes_vendidos > 9990 && (
              <p className='text-red-400 font-bold mt-2'>
                Está acabando...
              </p>
            )}
          </div>
        </Link>
      )}
      <div className='flex flex-col gap-6'>
        {rifas.rifas && rifas.rifas.map(rifa => (
          <Link href={`/rifas/${rifa._id}`} key={rifa._id} className='flex bg-gray-900 rounded-lg shadow-lg overflow-hidden'>
            <img src={rifa.urlImage} alt="" className='w-[180px] h-[120px] object-cover' />
            <div className='flex-1 p-4'>
              <h2 className='text-lg font-semibold text-white'>{rifa.nome}</h2>
              <p className='text-sm text-gray-400 mt-1'>Data do sorteio: {formatDateToBrazilian(rifa.data_sorteio)}</p>
              <div className='flex items-center mt-2'>
                {!rifa.sorteada ? (
                  <button className='bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-all'>
                    Adquira já
                  </button>
                ) : (
                  <p className='bg-gray-700 text-white px-4 py-1 rounded-md text-center'>
                    Concluído
                  </p>
                )}
                {rifa.bilhetes_vendidos > 9000 && (
                  <p className='text-red-400 font-bold ml-4'>
                    Acabando...
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
