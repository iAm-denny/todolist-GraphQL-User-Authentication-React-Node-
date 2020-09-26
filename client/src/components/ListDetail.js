import React from 'react'
import {useMutation} from '@apollo/client'
import {deleteList, ListType} from '../gql/queries'
import { FaAngleDown } from"react-icons/fa";
import { FaAngleUp } from"react-icons/fa";
import { FaTrashAlt } from 'react-icons/fa';

function ListDetail({item, userId}) {
    const [showContext, setShowContext] = React.useState(true)
    const [deleteMut ,{ loading }] = useMutation(deleteList)

    function  toggleContext()   {
        setShowContext(!showContext)
      }
      function deleteBtn(e) {
        e.preventDefault()
        deleteMut({
            variables: { id: item.id},
            refetchQueries: [
                {
                  query: ListType,
                  variables: {  userId }
                }
              ]
        })
      }
    return (
             <div key={item.id} className='main_context'>
            <div key={item.id} className='header'>
              <div>{item.header} </div>
              <div>
    <span className='showContextBtn' onClick={toggleContext}>{showContext ? < FaAngleDown/> : <FaAngleUp/>}</span>
              <form onSubmit={deleteBtn}>
                      <input type='hidden' value={item.id} />
                      <button className='deleteBtn'><FaTrashAlt/></button>
                  </form>
            {loading ? <span  >Loading ... </span> : null}
              </div>
  
              </div>
              <div className={showContext? 'contextNotAcitve' : 'contextActive'} >
                  {item.context}
                 
              </div>
        </div>
    )
}

export default ListDetail
