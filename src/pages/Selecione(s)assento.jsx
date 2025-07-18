// src/pages/SelecioneAssento.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
const SeatsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  margin: 40px 0 20px;
  text-align: center;
`;

const SeatsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 7px; /* Espaçamento entre os assentos */
  width: 100%;
  max-width: 320px; /* Largura máxima para a grade de assentos, ajuste conforme Figma */
  margin-bottom: 20px;
`;

const Seat = styled.div`
  width: 26px;
  height: 26px;
  background-color: ${props => {
    if (props.$isSelected) return '#1AAE9E';
    if (!props.$isAvailable) return '#FBE192';
    return '#C3CFD9';
  }};
  border: 1px solid ${props => {
    if (props.$isSelected) return '#0E7D71';
    if (!props.$isAvailable) return '#F7C52B';
    return '#808F9D';
  }};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 0.04em;
  color: ${props => (!props.$isAvailable ? '#4E5A65' : '#000000')}; /* Cor do número para indisponível */
  cursor: ${props => (props.$isAvailable ? 'pointer' : 'not-allowed')};
  user-select: none; /* Evita seleção de texto */
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 320px;
  margin-bottom: 40px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 13px;
      line-height: 15px;
      letter-spacing: -0.013em;
      color: #FFFFFF;
      margin-top: 5px;
    }
  }
`;

const LegendCircle = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${props => props.$color};
  border: 1px solid ${props => props.$borderColor};
  border-radius: 17px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px; /* Ajuste conforme Figma */
  margin-bottom: 40px;

  label {
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    height: 51px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
    padding-left: 18px;
    font-size: 18px;
    line-height: 21px;
    color: #AFAFAF; /* Cor do placeholder */
    margin-bottom: 20px;

    &::placeholder {
      color: #AFAFAF;
    }
  }

  button {
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    border: none;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.04em;
    color: #FFFFFF;
    cursor: pointer;
    align-self: center; /* Centraliza o botão */
    margin-top: 20px;
    &:hover {
      filter: brightness(1.1);
    }
  }
`;

const FooterBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 117px;
    background-color: #DFE6ED;
    border-top: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    padding: 0 10px;

    img {
        width: 64px;
        height: 89px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding: 8px;
        margin-right: 14px;
    }

    div {
        color: #293845;
        font-size: 26px;
        line-height: 30px;
    }
    p {
        margin: 0;
        font-size: 26px;
        line-height: 30px;
    }
`;

function SelecioneAssento() {
  const { idSessao } = useParams();
  const navigate = useNavigate();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerCpf, setBuyerCpf] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSessionDetails(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        console.error("Erro ao buscar assentos da sessão:", err);
      });
  }, [idSessao]);

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) {
      alert('Esse assento não está disponível');
      return;
    }

    if (selectedSeats.includes(seat.id)) {

      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedSeats.length === 0) {
      alert('Por favor, selecione ao menos um assento.');
      return;
    }
    if (!buyerName.trim() || !buyerCpf.trim()) {
      alert('Por favor, preencha seu nome e CPF.');
      return;
    }
    if (buyerCpf.trim().length !== 11 || isNaN(buyerCpf.trim())) {
      alert('CPF inválido. Por favor, insira 11 dígitos numéricos.');
      return;
    }


    const requestBody = {
      ids: selectedSeats,
      name: buyerName,
      cpf: buyerCpf,
    };

    const POST_API_URL = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';


    fetch(POST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text || response.statusText}`);
          });
        }
        return Promise.resolve();
      })
      .then(() => {
        navigate('/sucesso', {
          state: {
            movieTitle: sessionDetails.movie.title,
            sessionDate: sessionDetails.day.date,
            sessionTime: sessionDetails.name,
            selectedSeatNumbers: selectedSeats.map(seatId => {
                const seat = sessionDetails.seats.find(s => s.id === seatId);
                return seat ? seat.name : '';
            }),
            buyerName: buyerName,
            buyerCpf: buyerCpf,
          },
        });
      })
      .catch(err => {
        console.error("Erro ao reservar assentos:", err);
        alert(`Erro ao reservar assentos: ${err.message}. Por favor, tente novamente.`);
      });
  };

  if (loading) return <PageTitle>Carregando assentos...</PageTitle>;
  if (error) return <PageTitle>Erro ao carregar assentos: {error.message}</PageTitle>;
  if (!sessionDetails || !sessionDetails.seats || sessionDetails.seats.length === 0) {
    return <PageTitle>Nenhum assento disponível para esta sessão.</PageTitle>;
  }

  return (
    <SeatsPageContainer>
      <PageTitle>Selecione o(s) assento(s)</PageTitle>

      <SeatsGrid>
        {sessionDetails.seats.map(seat => (
          <Seat
            key={seat.id}
            $isAvailable={seat.isAvailable}
            $isSelected={selectedSeats.includes(seat.id)}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.name}
          </Seat>
        ))}
      </SeatsGrid>

      <LegendContainer>
        <div>
          <LegendCircle $color="#1AAE9E" $borderColor="#0E7D71" />
          <span>Selecionado</span>
        </div>
        <div>
          <LegendCircle $color="#C3CFD9" $borderColor="#808F9D" />
          <span>Disponível</span>
        </div>
        <div>
          <LegendCircle $color="#FBE192" $borderColor="#F7C52B" />
          <span>Indisponível</span>
        </div>
      </LegendContainer>

      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="name">Nome do comprador:</label>
        <input
          type="text"
          id="name"
          placeholder="Digite seu nome..."
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
        />

        <label htmlFor="cpf">CPF do comprador:</label>
        <input
          type="text"
          id="cpf"
          placeholder="Digite seu CPF..."
          value={buyerCpf}
          onChange={(e) => setBuyerCpf(e.target.value)}
          maxLength="11"
          required
        />

        <button type="submit">Reservar assento(s)</button>
      </FormContainer>
      <FooterBar>
        <img src={sessionDetails.movie.posterURL} alt={sessionDetails.movie.title} />
        <div>
          <p>{sessionDetails.movie.title}</p>
          <p>{sessionDetails.day.weekday} - {sessionDetails.name}</p>
        </div>
      </FooterBar>
    </SeatsPageContainer>
  );
}

export default SelecioneAssento;