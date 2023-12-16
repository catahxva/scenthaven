import classes from "./OrderPageAddress.module.css";

function OrderPageAddress({ address }) {
  return (
    <div>
      <h3 className={classes.address__title}>Address</h3>
      <span className={classes.address__span}>Name: {address.name}</span>
      <span className={classes.address__span}>Email: {address.email}</span>
      <span className={classes.address__span}>Country: {address.country}</span>
      <span className={classes.address__span}>State: {address.state}</span>
      <span className={classes.address__span}>City: {address.city}</span>
      <span className={classes.address__span}>Street: {address.street}</span>
      <span className={classes.address__span}>Number: {address.number}</span>
      <span className={classes.address__span}>
        Postal Code: {address.postalCode}
      </span>
      <span className={classes.address__span}>Phone: {address.phone}</span>
    </div>
  );
}

export default OrderPageAddress;
