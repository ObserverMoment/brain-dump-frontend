import React from 'react';
import styled from 'styled-components';

const IdeaTile = styled.div`
  padding: 10px;
  box-sizing: border-box;
    border-radius: 4px;
    width: 250px;
    height: 250px;
    margin: 20px;
    border: ${props => props.isEditing
        ? '3px solid lightblue;'
        : '1px solid lightgrey;'}
    box-shadow: ${props => props.isEditing
        ? '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);'
        : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);'}
`

const DeleteIdeaIcon = styled.img`
  width: 15px;
  &:hover {
    cursor: pointer;
  }
`

export default ({ idea, deleteIdea, isEditing, setEditableId }) => {
  return (
    <div>
      {
        !isEditing
          ? (
            <IdeaTile onClick={() => setEditableId(idea._id)} isEditing={isEditing}>
              <h4>{idea.title}</h4>
              <div><p>{idea.body}</p></div>
              <div><p>Posted by {idea.author} on {idea.created_at}</p></div>
              <DeleteIdeaIcon onClick={() => deleteIdea(idea._id)} src="/img/delete.svg" alt="Delete this idea"/>
            </IdeaTile>
          )
          : (
            <IdeaTile isEditing={isEditing}>
              <h4><input type="text" defaultValue={idea.title} /></h4>
              <div><p><input type="text" defaultValue={idea.body} /></p></div>
              <div><p>Originally posted by {idea.author} on {idea.created_at}</p></div>
              <button>Save Changes</button>
              <button onClick={() => setEditableId(null)}>Cancel Changes</button>
            </IdeaTile>
          )
      }
    </div>

  )
}
