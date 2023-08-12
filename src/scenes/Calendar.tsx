import { useState } from 'react';
import { tokens } from '../theme/theme';
import Box from '@mui/material/Box/Box';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

import { List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import Header from '../components/Header';

const Calendar: React.FC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected: any) => {
        const title = prompt('Please enter a new title for your event')
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            })
        }
    }

    const handleEventClick = (selected: any) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event ${selected.event.title}`
            )
        ) {
            selected.event.remove();
        }
    }

    return (
        <Box m='20px'>
            <Header title='CALENDAR' subtitle='Full Calendar Interative Page' />

            <Box
                sx={{
                    flex: '1 1 20%',
                    backgroundColor: colors.primary[400],
                    p: '15px',
                    borderRadius: '4px'
                }}
            >
                <Typography variant='h5'>
                    Events
                </Typography>
                <List>
                    {currentEvents.map((event: any) => (
                        <ListItem
                            key={event.id}
                            sx={{
                                backgroundColor: colors.greenAccent[500],
                                margin: '10px 0',
                                borderRadius: '2px'
                            }}
                        >
                            <ListItemText
                                primary={event.title}
                                secondary={
                                    <Typography>
                                        {formatDate(event.start, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* calendar */}
            <Box flex='1 1 100%' ml='15px'>
                <FullCalendar
                    height='75vh'
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    headerToolbar={{
                        left: 'prev, next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={(events: any) => setCurrentEvents(events)}
                    initialEvents={[
                        {
                            id: '1234',
                            title: 'All-day event',
                            date: '2023-08-10'
                        },
                        {
                            id: '4321',
                            title: 'Timed event',
                            date: '2023-08-25'
                        },
                    ]}
                />
            </Box>
        </Box>
    );
}

export default Calendar;
