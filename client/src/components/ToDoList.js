import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Cookies from "universal-cookie";
import { AddList, ListType } from "../gql/queries";
import { Link } from "react-router-dom";
import ListDetail from "./ListDetail";
import { FaPen } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

// get cookie
const cookies = new Cookies();
const getCookie = cookies.get("userId");

function ToDoList() {
  const [getUserId, setGetUserId] = React.useState(null);
  const [toDo, setToDo] = React.useState({ header: "", context: "" });
  const [userId, setUserId] = React.useState(getCookie);
  const [toggle, setToggle] = React.useState(true)

  function addToggle() {
    setToggle(!toggle)
  }

  // Post || Get Queries
  const [addToDoMut, {loading: addLoading}] = useMutation(AddList);
  const { loading, error, data } = useQuery(ListType, {
    variables: { userId },
  });

  function displayList() {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (data) {
      return data.lists.map((item) => {
        return (
              <ListDetail  item={item} userId={userId} />
        );
      });
    }
  }
  const submitHandle = (e) => {
    e.preventDefault();
    const { header, context } = toDo;
    console.log(header, context, userId);
    addToDoMut({
      variables: { header, context, userId },
      refetchQueries: [
        {
          query: ListType,
          variables: {  userId }
        }
      ]
    })
      .then(() => setToDo({header:"", context:""}))
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-container">
      <div className="list-container">
        <div className="lists">Your List</div>
        {displayList()}
      </div>
  <div onClick={addToggle} className='addShowBtn'>{ toggle?  <FaPen/>:  <FaTimes/>}</div>
      {toggle ?  null: (
        <form onSubmit={submitHandle} className="addlist-form">
        <h3 align='center'>Add your List</h3>
        <div>
          <label>Header</label>
          <input
            type="text"
            value={toDo.header}
            onChange={(e) => setToDo({ ...toDo, header: e.target.value })}
          />
        </div>
        <div>
          <label>Context</label>
          <input
            type="text"
            value={toDo.context}
            onChange={(e) => setToDo({ ...toDo, context: e.target.value })}
          />
        </div>
        <input
          type="hidden"
          value={getCookie}
          onChange={(e) => setUserId(e.target.value)}
        />
        <div>
          {" "}
          <button>Add</button>

        </div>
        {addLoading ? <div>Loading...</div> : null}
      </form>
      )
      
      }
      
    </div>
  );
}

export default ToDoList;
