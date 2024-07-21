import React, { useState } from 'react';

const Contato = ({ isOpen }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "→ Como é realizado o sorteio?", answer: "O sorteio é realizado através de um sistema automatizado que garante a aleatoriedade e transparência do processo." },
    { question: "→ Como o prêmio é entregue?", answer: "O prêmio é entregue pessoalmente ou enviado por correio, dependendo da localização do vencedor." },
    { question: "→ Como posso acessar minhas compras?", answer: "Você pode acessar suas compras através do painel do usuário em nosso site, usando seu login e senha." },
    { question: "→ Quem são os ganhadores?", answer: "Os ganhadores são anunciados em nosso site e redes sociais após a realização do sorteio." },
  ];

  return (
    <div className='bg-gray-100 p-8 rounded-lg shadow-lg'>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className='border-b border-gray-300'>
              <button
                className="w-full text-left p-4 bg-white rounded-lg shadow-md focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-700">{faq.question}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-2">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-6 text-gray-800">Formulário de Contato</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              className="w-full p-3 bg-white rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Telefone</label>
            <input
              type="text"
              className="w-full p-3 bg-white rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu telefone"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Assunto</label>
            <input
              type="text"
              className="w-full p-3 bg-white rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o assunto"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Mensagem</label>
            <textarea
              className="w-full p-3 bg-white rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Digite sua mensagem"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contato;
