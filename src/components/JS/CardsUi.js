import React from "react";
import TinderCard from "react-tinder-card";
import { useSelector } from "react-redux";
import { selectUserdata } from "../../feature/navSlice";
// import database from '../firebase';
import "../CSS/Cards.css";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function CardsUi(props) {
  const [lastDirection, setLastDirection] = React.useState();
  const userValue = useSelector(selectUserdata);
  // const [people, setPeople] = useState([]);

  // useEffect(() => {
  //     // this is where the code run ...
  //     const unSubscribe = database.collection('people').onSnapshot(snapshot => (
  //         setPeople(snapshot.docs.map(doc => doc.data()))
  //     ));
  //     return () => {
  //         // cleanUp
  //         unSubscribe()
  //     }
  // }, [])
  //console.log(people);

  // Bad
  // const people =[];
  // people.push('sashen', 'hasindu')

  // Good
  // setPeople([...people, 'sashen', 'hasindu'])
  const swiped = async (direction, nameToDelete) => {
    if (direction === "right") {
      const ref = doc(db, "userInfo", props.data.email);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      
      await updateDoc(ref, {
        request: [...data.request, userValue.email],
      });
    }
  };

  return (
    <div>
      <div className="card__container">
        {/* {people.map(person => ( */}
           
          <TinderCard
            className="swipe"
            onSwipe={(dir) => swiped(dir, props.data.name)}
            key={1}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${props.data.photourl})` }}
              className="card"
            >
              <h3>{props.data.name}</h3>
                <h2 style={{color:"white", fontWeight:"bold"}}>Hobbies</h2>
             <span style={{color:"white", fontWeight:"bold"}}>{props.data.hobbies.map((item)=>{return item})}</span> 
            </div>
          </TinderCard>
          

        
        {/* ))} */}
      </div>
    </div>
  );
}

export default CardsUi;
