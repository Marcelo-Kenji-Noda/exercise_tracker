import React from 'react'
import { Daily } from '../store/daily'
import { List } from '@mui/material'
import DailyListItem from './DailyListItem'
type DailyListProps = {
    dailyList: Daily[]
}
function DailyList({dailyList}:DailyListProps) {
    return (
    <List>
        {dailyList.map((value, id) => (
            <DailyListItem key={id} daily={value}/>
        ))}            
    </List>
    )
}

export default DailyList