import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Container, Dropdown } from 'semantic-ui-react';
import Chat from '../Chat/Chat';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Game.scss';
import './Sablier.scss';

const diceOptions = [
  { key: 'd4', text: 'Dé de 4', value: 'd4' },
  { key: 'd6', text: 'Dé de 6', value: 'd6' },
  { key: 'd8', text: 'Dé de 8', value: 'd8' },
  { key: 'd10', text: 'Dé de 10', value: 'd10' },
  { key: 'd12', text: 'Dé de 12', value: 'd12' },
  { key: 'd20', text: 'Dé de 20', value: 'd20' },
  { key: 'd100', text: 'Dé de 100', value: 'd100' },
];

const diceMaxValue: { [key: string]: number } = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
};

function Game() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(60);
  const [selectedDice, setSelectedDice] = useState('d6');
  const [showDiceResult, setShowDiceResult] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [showCharacterSheet, setShowCharacterSheet] = useState(true);
  const [showCharacterSheetButton, setShowCharacterSheetButton] =
    useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowCharacterSheetButton(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: number;
    if (timerRunning && timeElapsed > 0) {
      interval = window.setInterval(() => {
        setTimeElapsed((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (timeElapsed === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeElapsed]);

  const handleDiceChange = (value: string) => {
    setSelectedDice(value);
  };

  const rollDice = () => {
    const max = diceMaxValue[selectedDice];
    const result = Math.floor(Math.random() * max) + 1;
    setDiceResult(result);
  };

  const toggleCharacterSheet = () => {
    setShowCharacterSheet(!showCharacterSheet);
  };

  const startTimer = () => {
    setTimeElapsed(60); // Réinitialisation de la durée à 30 secondes
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  function formatTime() {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }

  return (
    <div className="game-container">
      <Header />
      <Container className="main-content">
        <h1 className="create-title">Partie</h1>
        <div className="timer-section">
          <p>Temps restant: {formatTime()}</p>
          <div className="timer-controls">
            <Button onClick={timerRunning ? stopTimer : startTimer}>
              {timerRunning ? 'Stop' : 'Démarrer'}
            </Button>
          </div>
          <div className={`sablier ${timerRunning ? 'animate' : ''}`} />
        </div>
        <div className="dice-section">
          <Dropdown
            placeholder="Sélectionner un dé"
            selection
            options={diceOptions}
            onChange={(e, { value }) => handleDiceChange(value as string)}
          />
          <Button onClick={rollDice}>Lancer le dé</Button>
          <Checkbox
            label="Afficher le résultat aux autres joueurs"
            checked={showDiceResult}
            onChange={() => setShowDiceResult(!showDiceResult)}
          />
          {diceResult !== null && <p>Résultat du dé: {diceResult}</p>}
        </div>
        <div className="content-section">
          <div className="left-section">
            {showCharacterSheetButton && (
              <Button onClick={toggleCharacterSheet}>Fiches</Button>
            )}
            {showCharacterSheet && (
              <div className="directory-window">
                <h2>Fiche Personnage</h2>
                {/* Implémenter ici la fiche personnage */}
              </div>
            )}
          </div>
          <div className="right-section">
            <Chat />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Game;
