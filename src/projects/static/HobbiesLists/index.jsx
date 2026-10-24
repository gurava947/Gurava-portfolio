import "./index.css";

function HobbiesLists() {
  return (
    <main className="hobbies-lists-page">
      <h1 className="Hobbies-heading">Hobbies</h1>
      <ul className="Hobbies-unorderlist">
        <li className="list-Hobbies">Painting</li>
        <li className="list-Hobbies">Reading Books</li>
        <li className="list-Hobbies">laying the Guitar</li>
      </ul>

      <h1 className="Hobbies-heading">Games</h1>
      <ul className="Games-unorderlist">
        <li className="list-Games">Volleyball</li>
        <li className="list-Games">Cricket</li>
        <li className="list-Games">Tennis Subjects</li>
      </ul>

      <h1 className="Hobbies-heading">Subjects</h1>
      <ol className="Subjects-olrderlist">
        <li className="list-Subjects">Volleyball</li>
        <li className="list-Subjects">Cricket</li>
        <li className="list-Subjects">Tennis Subjects</li>
      </ol>

      <h1 className="Hobbies-heading">Engineering Branches</h1>
      <ol className="Engineering-olrderlist">
        <li className="list-Engineering">Volleyball</li>
        <li className="list-Engineering">Cricket</li>
        <li className="list-Engineering">Tennis Subjects</li>
      </ol>

      <h1 className="Hobbies-heading">Mobiles</h1>
      <ol className="Mobiles-olrderlist">
        <li className="list-Mobiles">Sumsung</li>
        <li className="list-Mobiles">Red mi</li>
      </ol>

      <h1 className="Hobbies-heading">Stationeries</h1>
      <ol className="Stationeries-olrderlist">
        <li className="list-Stationeries">Book</li>
        <li className="list-Stationeries">Pencil</li>
        <li className="list-Stationeries">Pen</li>
      </ol>

      <h1 className="Hobbies-heading">Technologies</h1>
      <ol className="Technologies-olrderlist">
        <li className="list-Technologies">AI</li>
        <li className="list-Technologies">ML</li>
        <li className="list-Technologies">AR & VR</li>
      </ol>
    </main>
  );
}

export default HobbiesLists;
