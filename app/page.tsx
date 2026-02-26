'use client'

import { useState, useEffect } from "react";

interface StampData {
  merchantName: string,
  customerName: string,
  currentStamps: number,
  stampsRequired: number,
  rewardAvailable: boolean,
}

export default function Home() {
  const [stampsData, setStampsData] = useState<StampData | undefined>()
  
  const fetchStampData = async () => {
    try {
      const response = await fetch('http://localhost:5001/merchants/m1/customers/c1/card')
      const stamps = await response.json()
      setStampsData(stamps)
    } catch (error) {
      console.log("Fetch error: ", error)
    }
  }

  useEffect(() => {
    const fetchStampData = async () => {
    try {
      const response = await fetch('http://localhost:5001/merchants/m1/customers/c1/card')
      const stamps = await response.json()
      setStampsData(stamps)
    } catch (error) {
      console.log("Fetch error: ", error)
    }
    }
    fetchStampData()
  }, []);

  function getStamps() {
    const content = []
    if (!stampsData) {
      return <div>Could not fetch</div>
    }
    if (stampsData.currentStamps === stampsData.stampsRequired) {
      content.push(<li key={"reward"}>🎉 Reward Available!</li>)
      return content;
    }

    for (let i = 0; i < stampsData.currentStamps; i++) {
      content.push(<li key={i}>✅</li>)
    }
    for (let j = stampsData.currentStamps; j < stampsData.stampsRequired; j++) {
      content.push(<li key={j}>[]</li>)
    }
    return content;
  }

  const addStamp = async () => {
    const response = await fetch('http://localhost:5001/merchants/m1/customers/c1/stamps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"count": 1})
    })
    if (response.ok) {
      fetchStampData();
    }
  }

  if (stampsData === undefined) {
      return <div>Could not fetch <data value=""></data></div>
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black font-sans text-center">
        <div>
          <p className="text-white">{stampsData.merchantName}</p>
          <p className="text-white">Customer: {stampsData.customerName}</p>
        </div>
        <p className="text-white">{stampsData.currentStamps}/{stampsData.stampsRequired}</p>
        <div className="flex justify-center w-full">
          <ul className="flex flex-row flex-wrap justify-center gap-4">
            {getStamps()}
          </ul>
        </div>
        <button className="text-white" onClick={() => addStamp()}>Add stamp</button>
      </div>
    );
  }
}
