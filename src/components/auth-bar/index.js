import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function AuthBar(props) {
  const cn = bem("AuthBar");
  console.log("props.user.username", props.user?.profile.name, props.user);
  return (
    <div className={cn()}>
      {props.user ? (
        <Link to={props.profileLink}>
          <span className={cn("user")}>{props.user?.profile.name}</span>
        </Link>
      ) : null}
      {props.user ? (
        <button onClick={() => props.signOut()}>
          {props.t("auth-bar.sign-out")}
        </button>
      ) : (
        <Link to={props.loginLink}>
          <button>{props.t("auth-bar.sign-in")}</button>
        </Link>
      )}
    </div>
  );
}

AuthBar.propTypes = {
  signOut: PropTypes.func,
  user: PropTypes.object,
  t: PropTypes.func,
  profileLink: PropTypes.string,
  loginLink: PropTypes.string,
};

AuthBar.defaultProps = {
  signOut: () => {},
  t: (text) => text,
  profileLink: "/profile",
  loginLink: "/login",
};

export default memo(AuthBar);
