export function dragAndDropBoards(destination, source, draggableId) {
  return {
    type: "DRAG_AND_DROP_BOARDS",
    destination,
    source,
    draggableId
  };
}

export function dragAndDropTasks(destination, source, draggableId) {
  return {
    type: "DRAG_AND_DROP_TASKS",
    destination,
    source,
    draggableId
  };
}

export function addNewTask(taskName, boardId) {
  return {
    type: "ADD_NEW_TASK",
    taskName,
    boardId
  };
}

export function editTask(taskName, taskId) {
  return {
    type: "EDIT_TASK",
    taskName,
    taskId
  };
}

export function editTitle(title, boardId) {
  return {
    type: "EDIT_TITLE",
    title,
    boardId
  };
}

export function addNewBoard(boardName) {
  return {
    type: "ADD_NEW_BOARD",
    boardName
  };
}

export function deleteBoard(boardId) {
  return {
    type: "DELETE_BOARD",
    boardId
  };
}

export function deleteTask(taskId, boardId) {
  return {
    type: "DELETE_TASK",
    taskId,
    boardId
  };
}