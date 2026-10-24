import "./index.css";

function FlexboxProperties1() {
  return (
    <main className="flexbox-properties-page">
      <div className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-start">
          <p className="box1">Box1</p>
          <p className="box2">Box2</p>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <p className="box3">Box3</p>
          <p className="box4">Box4</p>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <p className="box5">Box5</p>
          <p className="box6">Box6</p>
        </div>
      </div>
    </main>
  );
}

export default FlexboxProperties1;
