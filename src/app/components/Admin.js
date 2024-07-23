'use client';
import React, { useRef, useState } from 'react';
import useFetchRifas from '../hooks/useInfos';
import { deletarRifa } from '../actions/deletarRifa';
import Header from '@/app/components/Header';
import { getToken } from '../actions/getToken';
import Link from 'next/link';
import { baseUrl } from '../../../baseUrl';
import Loading from './Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const { rifas } = useFetchRifas();
  const [selectedRifa, setSelectedRifa] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalBusca, setOpenModalBusca] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [number, setNumber] = useState("");
  const [ganhador, setGanhador] = useState(null);
  const [erro, setErro] = useState(null);
  const errorRef = useRef();
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const [newRifa, setNewRifa] = useState({
    nome: "",
    descricao: "",
    urlImage: "",
    preco: "",
    total_bilhetes: "",
    data_sorteio: ""
  });

  const [editRifa, setEditRifa] = useState({
    nome: "",
    descricao: "",
    urlImage: "",
    preco: "",
    total_bilhetes: "",
    data_sorteio: "",
    sorteada: false,
    numeroSorteado: ""
  });

  const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const confirmDelete = (rifa) => {
    setSelectedRifa(rifa);
    setShowModal(true);
  };

  function closeCreateModal(e) {
    if (e.target.id === "createModal") {
      setShowCreateModal(false);
    }
  }

  function closeEditModal(e) {
    if (e.target.id === "editModal") {
      setModalEdit(false);
    }
  }

  const handleDelete = async () => {
    if (selectedRifa) {
      await deletarRifa(selectedRifa._id);
      toast.success('Rifa deletada com sucesso!');
      setTimeout(() => {
        window.location.href = "/conta/admin";
      }, 3000);
    }
  };

  const openModalBusca = (rifa) => {
    setSelectedRifa(rifa);
    setOpenModalBusca(true);
  };

  const openEditModal = (rifa) => {
    setSelectedRifa(rifa);
    setEditRifa({
      nome: rifa.nome,
      descricao: rifa.descricao,
      urlImage: rifa.urlImage,
      preco: rifa.preco,
      total_bilhetes: rifa.total_bilhetes,
      data_sorteio: rifa.data_sorteio,
      sorteada: rifa.sorteada,
      numeroSorteado: rifa.numeroSorteado || ""
    });
    setModalEdit(true);
  };

  const buscarGanhador = async (e) => {

    e.preventDefault();
    clearTimeout(errorRef.current)
    const token = await getToken();
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/rifas/${selectedRifa._id}/numero/${number}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log(data)
if(data.message==="Este número nao foi comprado"){
  setErro("Este número nao foi comprado")
}

errorRef.current = setTimeout(()=>{
  setErro(null)
  return
},2000)

      setGanhador(data)
      console.log(ganhador)


      setLoading(false);

      if (data.status === 200) {
        setGanhador(data.user);
        setNumber("");
      }

      if (data.message === "Este número nao foi comprado") {
        setErro("Este número não foi comprado");
        setNumber("");
        setGanhador(null);
        errorRef.current = setTimeout(() => {
          setErro(null);
        }, 2000);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModalBuscarGanhador = () => {
    setOpenModalBusca(false);
    setGanhador(null);
    setNumber(null);
  };

  const close = (e) => {
    if (e.target.id === "modalBusca") {
      setOpenModalBusca(false);
    }
  };

  const handleCreateRifa = async (e) => {
    e.preventDefault();
    setCreateLoading(true);

    const token = await getToken();
    try {
      const response = await fetch(`${baseUrl}/rifas`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newRifa)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Rifa criada com sucesso!');
        setTimeout(() => {
          window.location.href = "/conta/admin";
        }, 3000);
      } else {
        toast.error(`Erro ao criar rifa: ${data.message}`);
      }

    } catch (error) {
      console.log(error);
      toast.error('Erro ao criar rifa');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleEditRifa = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    const token = await getToken();
    try {
      const response = await fetch(`${baseUrl}/rifas/${selectedRifa._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editRifa)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Rifa editada com sucesso!');
        setTimeout(() => {
          window.location.href = "/conta/admin";
        }, 3000);
      } else {
        toast.error(`Erro ao editar rifa: ${data.message}`);
      }

    } catch (error) {
      console.log(error);
      toast.error('Erro ao editar rifa');
    } finally {
      setEditLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRifa({
      ...newRifa,
      [name]: value
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRifa({
      ...editRifa,
      [name]: value
    });
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-[#1F2937] rounded-xl">
      {loading && <Loading />}
      {!loading && (
        <>
          <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8'>
            <h1 className="text-white text-2xl mb-4 md:mb-0">Administração de Rifas</h1>
            <button className='text-white bg-green-600 py-2 px-6 rounded-md' onClick={() => setShowCreateModal(true)}>Criar</button>
          </div>

          <div className="space-y-4">
            {rifas.rifas && rifas.rifas.map((rifa) => (
              <div key={rifa._id} className="bg-[#374151] p-4 rounded-md flex flex-col md:justify-between items-start md:items-center">
                <div className="w-full md:w-2/3">
                  <h2 className="text-white text-xl">{rifa.nome}</h2>
                  <img src={rifa.urlImage} alt={rifa.nome} className="w-full h-auto mb-2 rounded-md" />
                  <p className="text-gray-300 mb-2">
                    Descrição: {expandedDescriptions[rifa._id] ? rifa.descricao : `${rifa.descricao.substring(0, 100)}...`}
                    <button className="text-blue-500 ml-2" onClick={() => toggleDescription(rifa._id)}>
                      {expandedDescriptions[rifa._id] ? 'Ver menos' : 'Ver mais'}
                    </button>
                  </p>
                  <p className="text-gray-300">Preço: R${rifa.preco}</p>
                  <p className="text-gray-300">Data do Sorteio: {formatDateToBrazilian(rifa.data_sorteio)}</p>
                  <p className="text-gray-300">Total de Bilhetes: {rifa.total_bilhetes}</p>
                  <p className="text-gray-300">Bilhetes vendidos: {rifa.bilhetes_vendidos}</p>
                </div>

                <div className="flex mt-4 flex-col w-full lg:md:w-2/3 gap-2 ">
                  <button className="text-white bg-blue-600 py-2 px-6 rounded-md" onClick={() => openModalBusca(rifa)}>Buscar Ganhador</button>
                  <button className="text-white bg-yellow-600 py-2 px-6 rounded-md" onClick={() => openEditModal(rifa)}>Editar</button>
                  <button className="text-white bg-red-600 py-2 px-6 rounded-md" onClick={() => confirmDelete(rifa)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal para confirmação de exclusão */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Confirmação de Exclusão</h2>
            <p className="mb-6">Tem certeza de que deseja excluir a rifa <strong>{selectedRifa.nome}</strong>?</p>
            <div className="flex justify-end space-x-4">
              <button className="text-gray-700" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="text-red-600" onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para criar rifa */}
      {showCreateModal && (
        <div id="createModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeCreateModal}>
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Criar Nova Rifa</h2>
            <form onSubmit={handleCreateRifa}>
              <div className="mb-4">
                <label className="block text-gray-700">Nome</label>
                <input type="text" name="nome" value={newRifa.nome} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Descrição</label>
                <textarea name="descricao" value={newRifa.descricao} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">URL da Imagem</label>
                <input type="text" name="urlImage" value={newRifa.urlImage} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Preço</label>
                <input type="number" name="preco" value={newRifa.preco} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total de Bilhetes</label>
                <input type="number" name="total_bilhetes" value={newRifa.total_bilhetes} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Data do Sorteio</label>
                <input type="date" name="data_sorteio" value={newRifa.data_sorteio} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="flex justify-end">
                <button className="text-gray-700 mr-4" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                <button type="submit" className="text-white bg-green-600 py-2 px-6 rounded-md">{createLoading ? 'Criando...' : 'Criar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar rifa */}
      {modalEdit && (
        <div id="editModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeEditModal}>
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Editar Rifa</h2>
            <form onSubmit={handleEditRifa}>
              <div className="mb-4">
                <label className="block text-gray-700">Nome</label>
                <input type="text" name="nome" value={editRifa.nome} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Descrição</label>
                <textarea name="descricao" value={editRifa.descricao} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-md" required></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">URL da Imagem</label>
                <input type="text" name="urlImage" value={editRifa.urlImage} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Preço</label>
                <input type="number" name="preco" value={editRifa.preco} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total de Bilhetes</label>
                <input type="number" name="total_bilhetes" value={editRifa.total_bilhetes} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Data do Sorteio</label>
                <input type="date" name="data_sorteio" value={editRifa.data_sorteio} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sorteada</label>
                <input type="checkbox" name="sorteada" checked={editRifa.sorteada} onChange={(e) => setEditRifa({ ...editRifa, sorteada: e.target.checked })} className="form-checkbox" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Número Sorteado</label>
                <input type="number" name="numeroSorteado" value={editRifa.numeroSorteado} onChange={handleEditChange} className="w-full px-4 py-2 border rounded-md" disabled={!editRifa.sorteada} />
              </div>
              <div className="flex justify-end">
                <button className="text-gray-700 mr-4" onClick={() => setModalEdit(false)}>Cancelar</button>
                <button type="submit" className="text-white bg-green-600 py-2 px-6 rounded-md">{editLoading ? 'Editando...' : 'Editar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para buscar ganhador */}
      {modalBusca && (
        <div id="modalBusca" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={close}>
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Buscar Ganhador</h2>
            <form onSubmit={buscarGanhador}>
              <div className="mb-4">
                <label className="block text-gray-700">Número</label>
                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              {erro && <p className='py-2 text-red-600 font-bold text-center'>{erro}</p> }
              {ganhador && <div className='my-4 bg-gray-200 p-3 rounded-md'>
                <p className='text-green-600'>Ganhador {ganhador.nome}</p>
                <p className='text-green-600'>email {ganhador.email}</p>
              </div> }
              <div className="flex justify-end">
                <button className="text-gray-700 mr-4" onClick={closeModalBuscarGanhador}>Cancelar</button>
                <button type="submit" className="text-white bg-blue-600 py-2 px-6 rounded-md">{loading ? 'Buscando...' : 'Buscar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;

