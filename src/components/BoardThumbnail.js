import React, { useState} from "react";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import { editBoard, deleteBoard } from "../actions";

const Thumbnail = styled.div`
  position: relative;
  height: 280px;
  width: 280px;
  background: #9AAAFF;
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 4px grey;
  border: 7px white solid
`;
const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${Thumbnail}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${Thumbnail}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.h4`
  color: #4B3875;
  text-decoration: none;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const BoardThumbnail = ({ title, _id, user, dispatch }) => {
  console.log(title);

  const [isEditing, setIsEditing] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);

  const handleFocus = e => {
    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setBoardTitle(e.target.value);
  };

  const handleStartEditing = e => {
    e.preventDefault()
    setIsEditing(true)
  }

  const handleFinishEditing = e => {

    setIsEditing(false);
    dispatch(editBoard(_id, boardTitle));
  };

  const handleDeleteBoard = e => {
    e.preventDefault()
    dispatch(deleteBoard(_id));
  };

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={boardTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const EditDeleteIcons = () => (
    <>
      <DeleteButton fontSize="small" onClick={handleDeleteBoard}>
        delete
      </DeleteButton>
      <EditButton
        onClick={handleStartEditing}
        fontSize="small"
      >
        edit
      </EditButton>
    </>
  )

  return (
    <Thumbnail>
      {user && user.rol === 'admin' && <EditDeleteIcons />}
      {isEditing ? (
        renderEditInput()
      ) : (
        <Title>{title}</Title>
      )}
    </Thumbnail>
  );
};

const mapStateToProps = state => ({
  user: state.login.user
})

export default connect(mapStateToProps)(BoardThumbnail);
