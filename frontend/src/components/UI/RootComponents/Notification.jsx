import classes from "./Notification.module.css";

function Notification({ status, message }) {
  const backgroundClass =
    status === "success" || status === "pending"
      ? classes.notification__success
      : classes.notification__fail;

  return (
    <div className={`${classes.notification} ${backgroundClass}`}>
      <span className={classes.notification__message}>{message}</span>
    </div>
  );
}

export default Notification;
