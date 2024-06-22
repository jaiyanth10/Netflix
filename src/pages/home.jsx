import Main from "../components/main";
import Row from "../components/row.jsx";
import { popular, now_playing, upcoming, top_rated } from "../request";
export default function Home() {
  return (
    <>
      <Main />
      <Row rowID={1} title="Popular" fetchURL={popular} />
      <Row rowID={2} title="Upcoming" fetchURL={upcoming} />
      <Row rowID={3} title="Top Rated" fetchURL={top_rated} />
      <Row rowID={4} title="Now Playing" fetchURL={now_playing} />
    </>
  );
}
