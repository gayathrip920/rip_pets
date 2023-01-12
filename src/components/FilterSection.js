import React from 'react';

export const FilterSection = () => {
    return (
    <div style={{display:'flex', height: 50, backgroundColor: 'yellow', justifyContent: 'space-between', alignItems: 'center'}}>
       <button onClick={() => alert('clicked on fearured pets')} style={{margin: 30}}>fearured pets</button>
       <button onClick={() => alert('clicked on filter pets')} style={{margin: 30}}>filter</button>
    </div>
    )
}