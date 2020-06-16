import React, { Component } from "react";
import List from "./List";
import { connect } from "react-redux";
import Create from "./Create";
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Icon from "@material-ui/core/Icon";
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import AddUserDialog from "./AddUserDialog"
import Tooltip from '@material-ui/core/Tooltip';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard, fetchBoards, fetchBoardData, fetchUsersCompany, removeUserFromBoard  } from "../actions";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivStyled = styled.div`
  margin-left: 1em
`
const DivFlex = styled.div`
  display: flex;
`
const Avatars = styled.div`
  display: flex;;
  margin: auto 1em;
` 
const StyledAvatar = styled(Avatar)`
  margin: .1em;
  opacity: .7;
  &:hover {
    opacity: 1;
    cursor: pointer
  }
`
const BoardTitle = styled.h1`
  color: white
`
const PopContainer = styled.div`
  margin: 1em;
  min-width: 200px
`
const DeleteButton = styled(IndeterminateCheckBoxRoundedIcon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${PopContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;


// TODO: Fix performance issue

class Board extends Component {
  state = {
    openDialog: false,
    openPopOver: false,
    anchorEl: null
  }

  componentDidMount() {
    // set active board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
    this.props.dispatch(fetchBoards())
    this.props.dispatch(fetchBoardData())

  }

  shouldComponentUpdate(nextProps, nextState){
    const { lists, cards } = nextProps
    
    if(lists.isFetching || cards.isFetching)
      return false
    else
      return true 
  }
  handleFetchUsers = () => {
    this.props.dispatch(fetchUsersCompany())
    this.handleCloseDialog()
  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  renderAddUserIcon = () => (
    <>
      <Tooltip title="Add" placement="top">
        <StyledAvatar onClick={this.handleFetchUsers}><Icon>add</Icon></StyledAvatar> 
      </Tooltip>
      <AddUserDialog open={this.state.openDialog} onCloseDialog={this.handleCloseDialog} />
    </>
  )

  handleClickPopOver = (user) => (e) => {
    this.setState({
      anchorEl: e.currentTarget,
      openPopOver: true,
      userPop: user
    })
  }
  handleClosePopOver = () => {
    this.setState({
      anchorEl: null,
      openPopOver: false
    })
  }
  handleRemoveUser = () => {
    this.props.dispatch(removeUserFromBoard(this.state.userPop._id))
    this.handleClosePopOver()
  }

  render() {
    const { lists, cards, match, boards, userLogin } = this.props
    const { userPop } = this.state
    const { boardID } = match.params
    const board = boards[boardID]
    if (!board) {
      return null
    }
    const listOrder = board.lists;

    return (
      <DivStyled>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <DivFlex>
          <Typography><BoardTitle>{board.title}</BoardTitle></Typography>
          <Avatars>
            {Object.keys(this.props.users).map((userID)=>{
              if(userID !== 'isFetching' && userID !== 'error'){
                const user = this.props.users[userID]
                return (
                  <Tooltip title={user && user.name} placement="top" key={userID}>
                    <StyledAvatar onClick={this.handleClickPopOver(user)}>{user.name ? user.name.substring(0,1).toUpperCase() : 'U'}</StyledAvatar> 
                  </Tooltip>
                )
              }else{
                return null
              }
            })}

            {userLogin && userLogin.rol === 'admin' && this.renderAddUserIcon() }

              <Popover 
                open={this.state.openPopOver}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClosePopOver}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
              <Typography >
                <PopContainer>
                  {userPop && (<>
                    <div>{userPop.name &&  userPop.name}</div>
                    <div>{userPop.lastname &&  userPop.lastname}</div>
                    <div>{userPop.email && userPop.email}</div>
                    <div>{userPop.phone && userPop.phone}</div>
                    <div>{userPop.rol && userPop.rol}</div>
                    {userLogin && userLogin.rol === 'admin' && (
                      <DeleteButton fontSize="small" onClick={this.handleRemoveUser}>
                        delete
                      </DeleteButton>
                    )}  
                  </> )} 
                </PopContainer>
              </Typography>
            </Popover>
          </Avatars>
        </DivFlex>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map(cardID => {
                    if(cardID === 'isFetching' || cardID === 'error' )
                      return null
                    else 
                      return cards[cardID]
                  });
 
                  return (
                    <List
                      listID={list._id}
                      key={list._id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }else {
                  return null
                }
              })}
              {provided.placeholder}
              <Create list />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
      </DivStyled>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
  userLogin: state.login.user,
  users: state.users,
  usersCompany: state.usersCompany,
  activeBoard: state.activeBoard
});

export default connect(mapStateToProps)(Board);
