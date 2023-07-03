import React, { useState } from 'react'

function useDate(date) {
    const [showDate,setShowDate] = useState(new Date());
    setShowDate(new Date(date).toLocaleDateString('en-US', { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' }));
    
  return showDate;
}

export default useDate