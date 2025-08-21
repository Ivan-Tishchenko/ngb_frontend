import React, { useEffect, useState } from 'react';
import './quests.css';
import XPicon from '../img/XP.png';
import GEMicon from '../img/DIAMOND.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuests } from '../redux/quests/questsSelector.js';
import setQuests from '../redux/quests/actions/setQuests.js';

const Quests = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("daily"); /* "daily" or "standart" */
  const [modal, setModal] = useState(false);
  const [activeQuest, setActiveQuest] = useState({});

  const quests = useSelector(selectQuests);

  useEffect(()=>{
    dispatch(setQuests("daily"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <button className={`quest_type daily ${active === "daily" ? "active" : ""}`} onClick={()=> {
          setActive("daily");
          dispatch(setQuests("daily"));
          }}>Ежедневные</button>
        <button className={`quest_type standart ${active === "standart" ? "active" : ""}`} onClick={()=> {
          setActive("standart");
          dispatch(setQuests("standart"));
        }}>Обычные</button>
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