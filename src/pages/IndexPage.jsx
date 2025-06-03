import { useEffect, useState } from 'react';
import '../App.css';
import FilmCard from '../components/FilmCard';
//import movieData from './assets/movies.json';
//import useStoredState from './hooks/useStoredState';
import SelectedFilm from '../components/SelectedFilm';
import DayBar from '../components/DayBar';
import TicketSelector from '../components/TicketSelector';
import SeatSelector from '../components/SeatSelector';
import BookingSummary from '../components/BookingSummary';
import Modal from '../components/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';


const API_URL = import.meta.env.VITE_API_URL;

export default function IndexPage() {
  const token = useSelector(state => state.auth.token);
  const prices = {
    adult: 2500,
    student: 2000,
    senior: 1800,
  };
  const [day, setDay] = useState(() => {
    const jsDay = new Date().getDay(); // 0 = vasárnap, 1 = hétfő, ..., 6 = szombat
    return jsDay === 0 ? 7 : jsDay;    // vasárnapból 7 lesz, a többi nap változatlan
  });
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [adultCount, setAdultCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState(28);

  const fetchMovies = () => {
    setLoading(true);
    fetch(`${API_URL}/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hiba a filmek lekérésekor:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    setSelectedSeats([]);
    setSelectedTime(null);
    setAdultCount(0);
    setSeniorCount(0);
    setStudentCount(0);
  }, [selectedFilm, day]);

  useEffect(() => {
    setSelectedFilm(null);
  }, [day])

  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedTime]);

  const totalPrice = (adultCount * prices.adult) + (studentCount * prices.student) + (seniorCount * prices.senior);
  const selectedScreening =
    selectedFilm?.screenings.find(screening =>
      screening.start_time === selectedTime &&
      screening.week_day === day &&
      screening.week_number === week
    );

  const handleAdultChange = (e) => setAdultCount(Number(e.target.value));
  const handleStudentChange = (e) => setStudentCount(Number(e.target.value));
  const handleSeniorChange = (e) => setSeniorCount(Number(e.target.value));



  const handleBookingConfirm = async () => {
    const totalSelected = adultCount + seniorCount + studentCount;

    if (
      selectedScreening &&
      selectedSeats.length === totalSelected &&
      selectedSeats.length > 0
    ) {
      try {
        // Szükséges adatok formázása
        const seatData = selectedSeats.map(({ row, seat }) => ({
          row: row + 1,
          number: seat + 1,
        }));

        const ticketTypes = [];

        if (adultCount > 0) ticketTypes.push({ type: "normal", quantity: adultCount });
        if (studentCount > 0) ticketTypes.push({ type: "student", quantity: studentCount });
        if (seniorCount > 0) ticketTypes.push({ type: "senior", quantity: seniorCount });

        const res = await axios.post(`${API_URL}/bookings`, {
          screening_id: selectedScreening.id,
          seats: seatData,
          ticket_types: ticketTypes,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (res.data.status === 'success') {
          setIsModalOpen(true);
          fetchMovies();
        } else {
          alert('A foglalás nem sikerült: ' + res.data.message);
        }
      } catch (err) {
        console.error('Foglalási hiba:', err.response?.data || err.message);
        alert('Nem sikerült menteni a foglalást a szerverre.');
      }
    } else {
      alert('Nem választott ki elegendő helyet!');
    }
  };


  const filteredMovies = movies.filter((movie) =>
    movie.screenings?.some(
      (screening) => screening.week_day === day && screening.week_number === week
    )
  );

  return (
    <div>
      <DayBar onDayClick={setDay} selectedDay={day} />
      <div className="grid grid-cols-2 h-screen">
        {/* Filmek listája */}
        <div className="p-4">
          <p><button onClick={() => setWeek(week - 1)}>&lt; </button> {week}. hét <button onClick={() => setWeek(week + 1)}> &gt; </button></p>
          <div className="grid gap-4 auto-rows-max grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {filteredMovies.map((movie) => (
              <FilmCard
                key={movie.id}
                movie={movie}
                onSelect={() => setSelectedFilm(movie)}
              />
            ))}
          </div>
        </div>

        <div className="p-4 border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <SelectedFilm film={selectedFilm} day={day} week={week} onSelectTime={setSelectedTime} />
        </div>

        {
          selectedScreening && <TicketSelector
            adultCount={adultCount}
            studentCount={studentCount}
            seniorCount={seniorCount}
            handleAdultChange={handleAdultChange}
            handleStudentChange={handleStudentChange}
            handleSeniorChange={handleSeniorChange}
            totalPrice={totalPrice}
          />
        }

        {
          selectedScreening && (
            <SeatSelector
              selectedScreening={selectedScreening}
              totalTickets={adultCount + studentCount + seniorCount}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />
          )
        }

        {
          selectedScreening && (
            <BookingSummary
              selectedFilm={selectedFilm}
              selectedTime={selectedTime}
              day={day}
              adultCount={adultCount}
              studentCount={studentCount}
              seniorCount={seniorCount}
              selectedSeats={selectedSeats}
              totalPrice={totalPrice}
              handleBookingConfirm={handleBookingConfirm}
            />
          )
        }
      </div>

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setSelectedSeats([]);
        setSelectedFilm(null);
        setSelectedTime(null);
        setAdultCount(0);
        setStudentCount(0);
        setSeniorCount(0);
      }}>
        <h2 className="text-xl font-bold">Sikeres foglalás!</h2>
        <p className="mt-2">Köszönjük, a helyeket lefoglaltuk Önnek.</p>
      </Modal>
    </div>
  );
}
