import MainSwiper from "@/components/mainSwiper/MainSwiper"
import historicalDates from "@/lib/data"
export default function Home() {

  return (
      <main className="main">
          <section className="section">
              <h1 className="h1 title">Исторические<br/>даты</h1>
              <hr className="line line--horizontal"/>
              <hr className="line line--vertical"/>
              <MainSwiper data={historicalDates}/>
          </section>
      </main>
  );
}
