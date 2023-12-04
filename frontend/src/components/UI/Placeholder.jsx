import classes from "./Placeholder.module.css";

function Placeholder({ message, type }) {
  return (
    <div className={classes.placeholder}>
      <span
        className={`${classes.placeholder__message} ${
          type === "error" ? classes.placeholder__message__error : ""
        }`}
      >
        {message}
      </span>
    </div>
  );
}

export default Placeholder;
