import { Daily } from '../store/daily'
import DailyListItem from './DailyListItem'
import { List } from '@mui/material'

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