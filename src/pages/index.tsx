import { Calendar } from '@/entities/Calendar';
import { EventsProvider } from '@/entities/Event/model';
import { DeleteEvent } from '@/features/deleteEvent';
import { SelectToday } from '@/features/selectToday/ui/SelectToday';
import { EventsGrid } from '@/widgets/EventsGrid';
import { Header } from '@/widgets/Header';

const Routing = () => {
  return (
    <EventsProvider>
      <Header />
      <Calendar>
        <Calendar.Header>
          <Calendar.DayPicker />
          <Calendar.MonthSlider />
        </Calendar.Header>
        <Calendar.Body>
          <EventsGrid />
        </Calendar.Body>
        <Calendar.Footer>
          <SelectToday />
          <DeleteEvent />
        </Calendar.Footer>
      </Calendar>
    </EventsProvider>
  );
};

export { Routing };
