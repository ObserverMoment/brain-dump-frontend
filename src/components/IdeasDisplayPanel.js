import React from 'react';
import IdeaTile from './IdeaTile';
import styled from 'styled-components';

const IdeasDisplayPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const AddIdeaIcon = styled.img`
  width: 25px;
  &:hover {
    cursor: pointer;
  }
`

const renderTiles = (ideasArray, deleteIdea) => {
  return ideasArray.map(idea => {
    return (
      <IdeaTile deleteIdea={deleteIdea} key={idea._id} idea={idea}/>
    )
  })
}

export default ({ideasArray, addBlankIdea, deleteIdea}) => (
  <IdeasDisplayPanel>
    {renderTiles(ideasArray, deleteIdea)}
    <AddIdeaIcon onClick={addBlankIdea} src="/img/plus.svg" alt="Add a new idea"/>
  </IdeasDisplayPanel>
)
