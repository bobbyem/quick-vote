import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import emailjs from "emailjs-com";
import { setEmailSent } from "../features/slices/sessionSlice";

interface MailerProps {
  URL: string;
}

function Mailer(props: MailerProps) {
  const { emailSent } = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );
  const { creator } = useSelector(
    (state: RootState) => state.reducers.appReducer
  );
  const { email } = creator;
  const { URL } = props;
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (URL && !message) {
      setMessage(URL);
    }
    if (!emailSent && message) {
      sendEmail();
    }
  }, [emailSent, message]);

  function sendEmail(): void {
    if (message && email && !emailSent) {
      const templateParams = {
        message,
        email,
      };
      emailjs
        .send(
          process.env.REACT_APP_SERVICE_ID
            ? process.env.REACT_APP_SERVICE_ID
            : "",
          process.env.REACT_APP_TEMPLATE_ID
            ? process.env.REACT_APP_TEMPLATE_ID
            : "",
          templateParams,
          process.env.REACT_APP_EMAIL_KEY ? process.env.REACT_APP_EMAIL_KEY : ""
        )
        .then((response) => {
          console.log(response);
          dispatch(setEmailSent(true));
        });
    }
  }
  return <></>;
}

export default Mailer;
