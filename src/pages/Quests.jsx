import React, { useEffect, useState } from 'react';
import './quests.css';
import XPicon from '../img/XP.png';
import GEMicon from '../img/DIAMOND.png';

const Quests = () => {
  const [active, setActive] = useState("daily"); /* "daily" or "standart" */
  const [quests, setQuests]= useState([]);
  const [modal, setModal] = useState(false);
  const [activeQuest, setActiveQuest] = useState({})

  useEffect(()=>{
    setQuests([{questId: 1, text: "Пригласи друзей", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 2, text: "ВСТУПИ В КАНАЛ 'QWERTZUIOP'", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 3, text: "Пригласи друзей", isDone: true, isClaimed: true, rewardXP: 200, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 4, text: "Пригласи друзей", isDone: true, isClaimed: false, rewardXP: 25, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 5, text: "Пригласи друзей", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: 2},
                                       {questId: 6, text: "Пригласи друзей", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 7, text: "ПОДПИШИСЬ", isDone: true, isClaimed: true, rewardXP: 10, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 8, text: "Пригласи друзей", isDone: true, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 9, text: "СДЕЛАЙ ЧТОНИБУДЬ", isDone: false, isClaimed: false, rewardXP: 110, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 10, text: "Пригласи друзей", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: 1},
                                       {questId: 11, text: "Пригласи друзей", isDone: true, isClaimed: true, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 12, text: "Пригласи друзей", isDone: true, isClaimed: false, rewardXP: 20, rewardGEM: 1, executionsCount: 5},
                                       {questId: 13, text: "Пригласи друзей", isDone: false, isClaimed: false, rewardXP: 50, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 14, text: "СДЕЛАЙ ЧТОТО ЕШЕ", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 15, text: "Пригласи друзей", isDone: true, isClaimed: true, rewardXP: 20, rewardGEM: 10, executionsCount: "infinity"},
                                       {questId: 16, text: "Я НЕ ПИДУМАЛ", isDone: true, isClaimed: false, rewardXP: 30, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 17, text: "Пригласи друзей", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 18, text: "ПОТАНЦУЙ", isDone: false, isClaimed: false, rewardXP: 20, rewardGEM: 20, executionsCount: "infinity"},
                                       {questId: 19, text: "Пригласи друзей", isDone: true, isClaimed: true, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"},
                                       {questId: 20, text: "Пригласи друзей", isDone: true, isClaimed: false, rewardXP: 20, rewardGEM: 0, executionsCount: "infinity"}
                                      ]);
  }, [])

  return (<>
    {modal && <div className='modal_background' onClick={(event)=>{
          if(event.target === event.currentTarget) {
            setModal(false);
          }
          }}>
          <div className='modal'>
            <h2>чтоб выполнить задание нужно </h2>
            <p>{activeQuest.text}</p>
            <button onClick={()=> setModal(false)}>GO</button> 
          </div>
        </div>}
    <div className='quests_block'>
      <div className='quests_type_switcher'>
        <button className={`quest_type daily ${active === "daily" ? "active" : ""}`} onClick={()=>setActive("daily")}>Ежедневные</button>
        <button className={`quest_type standart ${active === "standart" ? "active" : ""}`} onClick={()=>setActive("standart")}>Обычные</button>
      </div>
      <ul className='quests_list'>
        {/* generate quests */
        quests.map(quest=> <li className='quest' key={quest.questId}>
            <p className='quest_text'>{quest.text}</p>
            <div className='reward_block'>
              <img src={XPicon} alt="XP icon"/>
              <p>{quest.rewardXP}</p>
              {quest.rewardGEM > 0 ?? <><img src={GEMicon} alt="GEM icon" /><p>{quest.rewardGEM}</p></>}
            </div>
            {quest.isDone ?
              quest.isClaimed ? 
                <button className="claim_reward_button done">выполнено</button> : 
                <button className="claim_reward_button claim">Получить</button> : 
              <button className="claim_reward_button do" onClick={()=>{
                setModal(true);
                setActiveQuest(quest);
                console.log("click");
                console.log(activeQuest)
                }}>Выполнить</button>}
          </li>)}
      </ul>
    </div>
    </>
  )
}

export default Quests