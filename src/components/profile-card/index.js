import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileCard({ user, t }) {
  const cn = bem("ProfileCard");
  return (
    <div className={cn()}>
      <div className={cn("head")}>{t("profile-card.header")}</div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile-card.name")}:</div>
        <div className={cn("value")}>
          {user?.profile.name}
        </div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile-card.phone")}:</div>
        <div className={cn("value")}>{user?.profile.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile-card.email")}:</div>
        <div className={cn("value")}>{user?.email}</div>
      </div>
    </div>
  );
}

 ProfileCard.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func
};

ProfileCard.defaultProps = {
  t: (text) => text,
} 

export default memo(ProfileCard);
