'use client'
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { baseUrl } from '../../../../baseUrl';
import { IoMdAlert } from "react-icons/io";
import { FaPlus, FaMinus, FaArrowRightLong, FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { getToken } from '@/app/actions/getToken';
import { GiConfirmed } from "react-icons/gi";
import Link from 'next/link';
import Loading from '@/app/components/Loading';

const Page = ({ params }) => {
  const [rifa, setRifa] = useState(null);
  const [quantidadeBilhetes, setQuantidadeBilhetes] = useState(10);
  const [loading, setLoading] = useState(true);
  const [descVisible, setDescVisible] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false); // fixed to initialize as false

  const successRef = useRef();
  const errorRef = useRef();

  function openDesc() {
    setDescVisible(prev => !prev);
  }

  function aumentarQuantidade() {
    if (quantidadeBilhetes < 2000) {
      setQuantidadeBilhetes(prev => Math.min(prev + 1, 2000));
    }
  }

  function diminuirQuantidade() {
    if (quantidadeBilhetes > 10) {
      setQuantidadeBilhetes(prev => Math.max(prev - 1, 10));
    }
  }

  useEffect(() => {
    async function getRifa() {
      try {
        const response = await fetch(`${baseUrl}/rifas/${params.id}`, {
          next: { revalidate: 1 },
        });
        const dados = await response.json();
        setRifa(dados.rifa);
        if (dados.bilhetes_vendidos === dados.total_bilhetes) {
          setDisabled(true);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getRifa();
  }, [params.id]);

  function pegarValor(e) {
    const elemento = parseInt(e.currentTarget.querySelector("p").textContent.replace("+", ""), 10);
    setQuantidadeBilhetes(prev => {
      const novaQuantidade = prev + elemento;
      return novaQuantidade <= 2000 ? novaQuantidade : 2000;
    });
  }

  useEffect(() => {
    if (quantidadeBilhetes > 2000) {
      setQuantidadeBilhetes(2000);
    }
  }, [quantidadeBilhetes]);

  const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  async function comprar(e) {
    e.preventDefault();
    clearTimeout(successRef.current);
    clearTimeout(errorRef.current);
    const token = await getToken();
    
    if (!token) {
      setModalLogin(true);
    } else {
      try {
        if (rifa.bilhetes_vendidos === rifa.total_bilhetes) {
          alert("Todos os bilhetes já foram vendidos");
          return;
        }
        
        setLoading(true);
        const response = await fetch(`${baseUrl}/rifas/comprar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            rifaId: params.id,
            quantidadeBilhetes,
          }),
        });

        const data = await response.json();
        setLoading(false);

        if (data.message === "Bilhetes comprados com sucesso!") {
          setSuccess("Bilhetes comprados com sucesso!");
          successRef.current = setTimeout(() => {
            setSuccess("");
            window.location.href = "/conta";
          }, 1000);
        }

        if (data.error === 'Não há bilhetes suficientes disponíveis') {
          setError("Não há bilhetes suficientes disponíveis");
          errorRef.current = setTimeout(() => {
            setError("");
          }, 1000);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  function fecharModalLogin(e) {
    if (e.target.id === "modalLogin") {
      setModalLogin(false);
    }
  }

  return (
    <div className="max-w-3xl w-full mx-auto bg-[#f4f6f8] rounded-xl relative">
      <Link href="/" className='absolute z-10 bg-white top-2 left-2 p-2 rounded-full shadow-lg border'><IoIosArrowBack className='text-3xl text-red-600 '/></Link>
      {loading && <Loading /> }
      {success && (
        <div className='bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-25 backdrop-blur-sm'>
          <p className='flex items-center gap-2 bg-white text-black px-4 py-2 border-b-4 border-green-600'>Bilhetes comprados com sucesso <GiConfirmed className='text-green-600' /></p>
        </div>
      )}
      {error && (
        <div className='bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-25 backdrop-blur-sm'>
          <p className='flex items-center gap-2 bg-white text-black px-4 py-2 border-b-4 border-red-600'>{error}<IoMdAlert className='text-red-600' /></p>
        </div>
      )}
      <div className='relative bg-gradient-to-b from-white to-black'>
        {rifa && <img src={rifa.urlImage} alt={rifa.nome} className='w-full h-full max-h-[400px] object-cover' />}
        <div className='absolute bottom-[20px] z-10 text-white p-2'>
          {!rifa?.sorteada ? (
            <button className='bg-green-600 rounded-md text-white py-2 px-6 my-2 animate-pulse'>Adquira já</button>
          ) : (
            <p className='bg-black text-white px-6 rounded-md text-center mt-1 max-w-[120px]'>Concluído</p>
          )}
          <h1 className='uppercase'>{rifa?.nome}</h1>
          {rifa?.bilhetes_vendidos > 9000 && (
            <p className='text-red-600 font-bold bg-black py-1 px-2 rounded-md animate-pulse'>Está quase acabando...</p>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center flex-col px-4'>
        <p className='text-center mt-1 text-xs'>Sorteio <span className='bg-white py-1 px-2 rounded-md shadow-md text-xs ml-2'>{formatDateToBrazilian(rifa?.data_sorteio)} às 19:00</span> Por apenas <span className='ml-2 bg-[#1f1e1e] text-white px-4 rounded-md'>R$ {Number(rifa?.preco)}</span></p>
        <p className='bg-white w-full text-center mt-1 text-gray-400 rounded-full text-sm py-1 mb-3'>Quanto mais títulos, mais chances de ganhar</p>

        {!rifa?.sorteada && (
          <>
            <div className='grid grid-cols-3 w-full gap-2'>
              {[50, 100, 200, 300, 500, 1000].map(valor => (
                <div key={valor} className='bg-[#1f1e1e] text-white rounded-md text-center py-4 cursor-pointer' onClick={pegarValor}>
                  <p className='text-3xl font-bold'>+{valor}</p>
                  <p>SELECIONAR</p>
                </div>
              ))}
            </div>

            <div className='flex items-center justify-between gap-4 w-full py-2'>
              <div className='bg-white px-2 py-4 rounded-md'>
                <button className='border rounded-full p-1 text-gray-500' onClick={diminuirQuantidade}><FaMinus /></button>
                <span className='px-4 lg:px-20 border mx-2 rounded-md py-2 font-medium'>{quantidadeBilhetes}</span>
                <button className='border rounded-full bg-[#1f1e1e] text-white p-1' onClick={aumentarQuantidade}><FaPlus /></button>
              </div>

              {!loading ? (
                <button className='flex items-center bg-green-600 gap-2 flex-1 px-2 py-1 rounded-md cursor-pointer' onClick={comprar}>
                  <div className='bg-white p-3 rounded-md'>
                    <FaArrowRightLong className='text-green-600' />
                  </div>
                  <div className='text-white'>
                    <p className='text-sm'>PARTICIPAR</p>
                    <p className='text-green-100'>R$ {Number(rifa?.preco * quantidadeBilhetes).toFixed(2)}</p>
                  </div>
                </button>
              ) : (
                <button className='flex items-center bg-gray-400 gap-2 flex-1 px-2 py-1 rounded-md cursor-pointer'>
                  <div className='bg-white p-3 rounded-md'>
                    <FaArrowRightLong className='text-gray-400' />
                  </div>
                  <div className='text-white'>
                    <p className='text-sm'>PROCESSANDO</p>
                  </div>
                </button>
              )}
            </div>
          </>
        )}

        <p className='my-4 text-sm text-gray-600'>
          {descVisible ? rifa?.descricao : `${rifa?.descricao.substring(0, 100)}...`}
          <button onClick={openDesc} className='ml-2 text-green-600 flex items-center'>
            {descVisible ? (
              <>
                <FaArrowUp className='mr-1' /> Mostrar menos
              </>
            ) : (
              <>
                <FaArrowDown className='mr-1' /> Mostrar mais
              </>
            )}
          </button>
        </p>
      </div>

      {modalLogin && (
        <div id='modalLogin' className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={fecharModalLogin}>
          <div className='bg-white p-6 rounded-md max-w-xs text-center'>
            <p className='mb-4'>Você precisa estar logado para comprar bilhetes.</p>
            <Link href="/login">
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Fazer Login</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
