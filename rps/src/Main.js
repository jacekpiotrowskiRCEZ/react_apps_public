import React from 'react';
import { useState , useEffect } from 'react';

const Main = () => {
const[userchoice , setUserchoice] = useState("rock");
const[compchoice , setCompchoice] = useState("rock");
const[userscore , setUserscore] = useState(0);
const[compscore , setCompscore] = useState(0);
const[result , setResult] = useState("Zobaczmy, kto wygra!");
const[turnresult, setTurnresult] = useState(null);
const[gameover , setGameover] = useState(false);

const [color, setColor] = useState('for_remis');

const choices = ["rock" , "paper" , "scissors"];

const handleClick = (value) => {
    setUserchoice(value);
    generateComputerChoice();
}

const generateComputerChoice = () => {
    const random = choices[Math.floor(Math.random() * choices.length)]
    setCompchoice(random);
}

const reset = () => {
    window.location.reload();
}

useEffect(() => {
    const moves = userchoice + compchoice;
    if(userscore <=5 || compscore <=5 ){
        if(moves === "rockscissors" || moves === "scissorspaper" || moves === "paperrock" ){
            const userupdatedscore = userscore + 1;
            setUserscore(userupdatedscore);
            setColor("for_winner");
            
            setTurnresult(`Wygrałeś!! twój wynik ${userchoice} i wynik komputera ${compchoice}`);
            if(userscore === 5){
                setResult("Wygrałeś tę grę!!");
                setGameover(true);
            }
        }
        if(moves === "paperscissors" || moves === "rockpaper" || moves === "scissorsrock"){
            const compupdatedscore = compscore + 1;
            setCompscore(compupdatedscore);
            setColor("for_looser");
           
            setTurnresult(`Przegrałeś!! twój wynik ${userchoice} i wynik komputera ${compchoice}`)
            if(compscore === 5){
                setResult("Komputer wygrał grę");
                setGameover(true);
            }
        }
        if(moves === "rockrock" || moves === "paperpaper" || moves === "scissorsscissors"){
            setColor("for_remis");
            setTurnresult(`Remis!! twój wynik ${userchoice} i wynik komputera ${compchoice}`)
        }
    }
},[userchoice , compchoice])

  return <div className='main'>
      <div className='score'>
          <h1>Użytkownik - {userscore} </h1>
          <h1>Komputer - {compscore}</h1>
      </div>

      <div className='choice'>
          <div className='user-choice'>
              <img className='user-hand' src={`../images/${userchoice}.png`} width="200px" height="100px"></img>
          </div>
          <div className='comp-choice'>
              <img className='comp-hand' src={`../images/${compchoice}.png`} width="200px" height="100px"></img>
          </div>
      </div>

      <div className='button-div'>
        {choices.map((choice , index) => 
            <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameover}>
                {choice}
            </button>
        )}
      </div>

      <div className='turn-result'>
          <> <h3>Rezultat rundy</h3> <h2><span className={`${color}`}>{turnresult}</span> </h2> </>
      </div>
      <div className='final-result'>
        <h3> Wynik - {result}</h3>
      </div>

      <div className='restart-div'>
          {gameover && 
            <button className='reset' onClick={() => {reset()}}> Restart ?</button>
          }
      </div>
  </div>;
};

export default Main;
