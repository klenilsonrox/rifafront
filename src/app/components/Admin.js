'use client'
import React, { useRef, useState } from 'react';
import useFetchRifas from '../hooks/useInfos';
import { deletarRifa } from '../actions/deletarRifa';
import Header from '@/app/components/Header';
import { getToken } from '../actions/getToken';
import Link from 'next/link';
import { baseUrl } from '../../../baseUrl';

const Admin = () => {
  const { rifas } = useFetchRifas();
  const [rifa, setRifa] = useState(null);
  const [selectedRifa, setSelectedRifa] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalBusca, setOpenModalBusca] = useState(false);
  const [number, setNumber] = useState("");
  const [ganhador, setGanhador] = useState(null);
  const [erro, setErro] = useState(null);
  const errorRef = useRef();

  const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const confirmDelete = (rifa) => {
    setSelectedRifa(rifa);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (selectedRifa) {
      await deletarRifa(selectedRifa._id);
      alert('Rifa deletada com sucesso!');
      window.location.href = "/conta/admin";
    }
  };

  const openModalBusca = (rifa) => {
    setRifa(rifa);
    console.log(rifa);
    setOpenModalBusca(true);
  };

  const buscarGanhador = async () => {
    const token = await getToken();
    try {
      const response = await fetch(`${baseUrl}/rifas/${rifa._id}/numero/${number}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log(data.status);

      if (data.status === 200) {
        setGanhador(data.user);
        setNumber("");
       
      }

      if (data.message === "Este número nao foi comprado") {
        setErro("Este número não foi comprado");
        setNumber("");
        setGanhador(null)
        errorRef.current = setTimeout(() => {
          setErro(null);
          
        }, 2000);
      }

    } catch (error) {
      console.log(error);
    }
  };

  function closeModalBuscarGanhador(){
    setOpenModalBusca(false)
    setGanhador(null)
    setNumber(null)
  }
  function close(e){
    if(e.target.id==="modalBusca"){
        setOpenModalBusca(false)
    }
  }

  return (
    <div className="max-w-3xl w-full mx-auto bg-[#1F2937] rounded-xl p-4">

      {/* Modal para buscar ganhador */}
      {modalBusca && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 backdrop-blur-sm" id='modalBusca' onClick={close}>
          <div className="bg-[#1F2937] p-6 rounded-md max-w-md w-full">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Digite o número"
                  className="py-2 rounded-md pl-4 flex-1 bg-gray-700 text-white"
                  value={number}
                  onChange={({ target }) => setNumber(target.value)}
                />
                <button className="bg-green-600 px-4 py-2 rounded-md text-white" onClick={buscarGanhador}>Buscar</button>
              </div>
              {ganhador && (
                <div className="bg-[#374151] rounded-md p-4">
                  <p className="text-gray-200">Comprador: {ganhador.nome}</p>
                  <p className="text-gray-300">Email: {ganhador.email}</p>
                </div>
              )}
              {erro && <p className="text-center text-red-600 font-bold">{erro}</p>}
              <button className="bg-red-600 px-4 py-2 rounded-md text-white" onClick={closeModalBuscarGanhador}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-white text-2xl mb-8">Administração de Rifas</h1>
      <div className="flex flex-col gap-4 ">
        {rifas.rifas && rifas.rifas.map(rifa => (
          <div key={rifa._id} className="bg-[#374151] flex gap-4 p-4 rounded-lg flex-col lg:flex-row">
            <img src={rifa.urlImage} alt={rifa.nome} className="lg:w-32 h-screen max-h-[200px] lg:max-h-[260px] object-cover rounded-md" />
            <div className="flex flex-col w-full justify-between">
              <div className="flex justify-between flex-col  lg:glex-row ">
                <div>
                  <p className="text-white text-sm">ID: {rifa._id}</p>
                  <p className="text-white text-lg font-bold">{rifa.nome}</p>
                  <p className="text-gray-300 text-sm">Data do Sorteio: {formatDateToBrazilian(rifa.data_sorteio)}</p>
                  {!rifa.sorteada ? <p className='text-green-600 font-bold mb-2'>Em Andamento</p> : <p className='text-red-600 font-bold mb-2'>Concluída</p> }
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-green-600 px-4 py-2 rounded-md text-white">Editar Rifa</button>
                  <button className="bg-red-600 px-4 py-2 rounded-md text-white" onClick={() => confirmDelete(rifa)}>Deletar Rifa</button>
                  <button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={() => openModalBusca(rifa)}>Buscar ganhador</button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-2">Premio: {rifa.nome}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md max-w-xs text-center">
            <p className="mb-4">Deseja realmente deletar a rifa?</p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleDelete}>Deletar</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
