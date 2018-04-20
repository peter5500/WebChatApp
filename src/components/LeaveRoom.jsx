import React from 'react';

const LeaveRoom = ({socket, username, currentUser, currentRoom, changeRoom}) => {
  return(
    <div>
      <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalCenter"><img class="logout-picture" src="http://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Logout.png&r=255&g=255&b=255"></img>Leave Room</button>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Leave Room</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Are you sure you want leave the room?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => changeRoom(socket, currentUser, currentRoom, "dashboard")}>Yes</button>
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LeaveRoom;