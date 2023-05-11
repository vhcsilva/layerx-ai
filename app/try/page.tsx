'use client'
import React, { useEffect, useRef, useState } from "react";

import styles from './page.module.css'
import Choice from "../components/steps/choice";
import Hackathon from "../components/steps/hackathon";
import Loading from "../components/steps/loading";
import Bounty from "../components/steps/bounty";
import HackathonResult from "../components/hackathon-result";
import BountyResult from "../components/bounty-result";

export default function Home() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [choice, setChoice] = useState();
  const [result, setResult] = useState<any>();
  const messageRef = useRef(null);
  
  const [hackatonData, setHackatonData] = useState({
    theme: "",
    startDate: "",
    endDate: "",
    additionalInformation: ""
  });

  const [bountyData, setBountyData] = useState({
    task: "",
    description: ""
  });

  function resetTimer() {
    setTyping(true);

    if (messageRef.current) {
      (messageRef.current as any).style.animationName = "none";

      requestAnimationFrame(() => {
        setTimeout(() => {
          (messageRef.current as any).style.animationName = "";
        }, 0);
      });
    }

    setTimer(setTimeout(() => {
      setTyping(false);
      clearTimeout(timer);
    }, 2000));
  }

  function nextStep() {
    setStep(step => step + 1);
    resetTimer();
  }

  function previousStep() {
    setStep(step => step -1);
  }

  function handleChoiceChanges(choice) {
    setChoice(choice);
    nextStep();
  }

  const choiceColor = choice === "hackathon" ? "var(--hackathonColor)" : "var(--bountyColor)";
  const steps = [
    {
      message: "Hello there! My name is Maya and I'm here to help you. What do you wish to create?",
      component: <Choice setChoice={handleChoiceChanges} />
    },
    {
      hackathon: {
        message: "Great! Please tell me more about your hackathon.",
        component: <Hackathon choiceColor={choiceColor} setHackatonData={setHackatonData} hackatonData={hackatonData} />
      },
      bounty: {
        message: "Great! Please tell me more about your bounty.",
        component: <Bounty choiceColor={choiceColor} setBountyData={setBountyData} bountyData={bountyData} />
      }
    },
    {
      hackathon: {
        message: `I'm creating the best hackathon for you, it can take a few seconds.`,
        component: <Loading />
      }
    },
    {
      hackathon: {
        message: "Here is the Hackathon requested",
        component: <HackathonResult result={result} />
      },
      bounty: {
        message: "Here is the Bounty requested",
        component: <BountyResult result={result}  />
      }
    }
  ];

  function getStep() {
    if (step === 0) return steps[step];
    else if (choice) return steps[step][choice];

    return undefined;
  }

  function validateHackatonData() {
    const { theme, startDate, endDate, additionalInformation } = hackatonData;

    return theme !== "" && startDate !== "" && endDate !== "" && additionalInformation !== "";
  }

  function validateBountyData() {
    const { task, description } = bountyData;

    return task !== "" && description !== "";
  }

  function isSubmitDisabled() {
    if (choice === "hackathon")
      return !validateHackatonData();

    return !validateBountyData();
  }

  function handleSubmit() {
    nextStep();

    const hackathonResult = {
      overview: "This hackathon is themed around The Simpsons game and invites participants to come up with innovative ideas and solutions to improve the game experience. Participants can form teams and work on their ideas throughout the event, with the opportunity to present their work and compete for prizes.",
      themes: "The Simpsons game, game design, game development, user experience",
      deliverables: "Participants are expected to create a working prototype or minimum viable product (MVP) that showcases their idea and how it can improve the game experience. The prototype should be accompanied by a brief presentation that explains the idea and its potential impact.",
      judgingCriteria: "The judges will evaluate the prototypes based on the following criteria: innovation, creativity, technical complexity, user experience, and potential impact. Bonus points will be awarded for ideas that incorporate the theme of The Simpsons game and its characters.",
      prizes: "The top three teams will receive cash prizes as follows: 1st place - $5,000; 2nd place - $3,000; 3rd place - $2,000. In addition, all participants will receive a certificate of participation and the opportunity to network with industry professionals.",
      timeline: {
        start: "11-05-2023",
        end: "20-05-2023",
        events: [
          "Opening ceremony and team formation - 11-05-2023",
          "Workshops and mentorship sessions - 12-05-2023 to 15-05-2023",
          "Submission deadline - 19-05-2023",
          "Presentations and judging - 20-05-2023",
          "Closing ceremony and announcement of winners - 20-05-2023",
        ]
      }
    };

    const bountyResult = {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      programmingLanguages: [
        "Javascript",
        "Typescript",
        "NodeJS"
      ],
      rewardAmount: "$ 5,000.00"
    };

    setTimeout(() => {
      if (choice === "hackaton") setResult(hackathonResult);
      else setResult(bountyResult);

      nextStep();
    }, 5000);
  }

  useEffect(() => {
    resetTimer();
  }, []);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img src="/maya-avatar.png" alt="Maya avatar" />
          <span ref={messageRef}>
            {getStep()?.message}
          </span>
        </div>

        { !typing && 
          <div className={styles.subContainer}>
            <div className={styles.componentContainer}>
              {getStep()?.component}
            </div>

            { step === 1 &&
              <div className={styles.btnsContainer}>
                <button className="button" onClick={previousStep}>
                  Back
                </button>

                <button 
                  className="button" 
                  style={{ backgroundColor: choiceColor }}
                  disabled={isSubmitDisabled()}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            }
          </div>
        }
      </div>
    </main>
  )
}