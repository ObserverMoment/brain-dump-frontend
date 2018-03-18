import React from 'react';
import styled from 'styled-components';

const IdeaTile = styled.div`
  width: 250px;
  height: 250px;
  margin: 20px;
`

const DeleteIdeaIcon = styled.img`
  width: 15px;
  &:hover {
    cursor: pointer;
  }
`

export default ({ idea, deleteIdea }) => {
  return (
    <IdeaTile>
      <h4>{idea.title}</h4>
      <div><p>{idea.body}</p></div>
      <div><p>Posted by {idea.author} on {idea.created_at}</p></div>
      <DeleteIdeaIcon onClick={() => deleteIdea(idea._id)} src="/img/delete.svg" alt="Delete this idea"/>
    </IdeaTile>
  )
}
