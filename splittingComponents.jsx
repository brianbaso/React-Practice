/*
    Comment
      - User info
        - Avatar (image)
        - Name (string)
      - Comment text (string)
      - Comment date (date)

    This component can be tricky to change because of all the
    nesting, and it is also hard to reuse individual parts of 
    it. Let’s extract a few components from it.
*/

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">

        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>

      </div>

      <div className="Comment-text">
        {props.text}
      </div>

      <div className="Comment-date">
        {formatDate(props.date)}
      </div>

    </div>
  );
}

// First, lets extract the avatar
/*
    The Avatar doesn’t need to know that it is being rendered 
    inside a Comment. This is why we have given its prop a more 
    generic name: user rather than author.
*/
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl},
      alt={props.user.name}
    />
    );
}

// Next, UserInfo
function UserInfo(props) {
  return (
    <div className="UserInfo-name">
      {props.user.name}
    </div>
    );
}

// Next, CommentText
function CommentText(props) {
  return (
    <div className="Comment-text">
        {props.text}
    </div>
    );
}

// Last, CommentDate
function CommentDate(props) {
  return (
    <div className="Comment-date">
        {formatDate(props.date)}
    </div>
    );
}

// Now rewrite the Comment component
function Comment(props) {
  return (
    <div className="Comment">
      <Avatar user="{props.user}" />
      <UserInfo user="{props.user}" />
      <CommentText text="{props.text}" />
      <CommentDate text="{props.date" />
    </div>
    );
}
