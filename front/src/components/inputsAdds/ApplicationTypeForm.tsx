import React from "react";
import AddInputForm from "../UI/AddInputFormError";
import axios from "axios";
import styles from "../../css/components/inputAdds/ApplicationTypeForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function ApplicationTypeForm() {
  const [applicationType, setApplicationType] = useState("");

  const changeHandler = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setApplicationType(event.target.value);
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post(
          "http://localhost:8800/api/post/applicationType",
          { applicationType },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="type"
        type="text"
        placeholder="Тип заявки"
        title="Название типа заявки должно состоять из 3-30 символов!"
        pattern="^[А-яа-я -]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default ApplicationTypeForm;
