import React, { useState, useEffect } from "react";
import axios from './http-common';
import "./App.css";

const { REACT_APP_API_BASE_URL } = process.env;

function App() {
  const [managers, setManagers] = useState([]);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [phoneNumberEnabled, setPhoneNumberEnabled] = useState(true);

  useEffect(() => {
    if (managers.length !== 0) {
      return;
    }

    axios.get('/api/supervisors')
      .then(function (response) {
        setManagers(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  });

  return (
    <div id="form-root">
      <section class="hero">
        <div class="hero-body">
          <p class="title has-text-centered">
            Notification Form
          </p>
        </div>
      </section>
      <section class="section">
        <form action={REACT_APP_API_BASE_URL + "/api/submit"} method="post">
          <div class="columns">
            <div class="column is-half">
              <label for="firstName">First Name</label>
              <input class="input" type="text" id="firstName" name="firstName" />
            </div>
            <div class="column is-half">
              <label for="lastName">Last Name</label>
              <input class="input" type="text" id="lastName" name="lastName" />
            </div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <label class="checkbox" for="email">
                <input type="checkbox" checked={emailEnabled} onClick={() => setEmailEnabled(!emailEnabled)} />
                Email
              </label>
              <input class="input" type="text" id="email" name="Email" disabled={!emailEnabled} />
            </div>
            <div class="column is-half">
              <label class="checkbox" for="phoneNumber">
                <input type="checkbox" checked={phoneNumberEnabled} onClick={() => setPhoneNumberEnabled(!phoneNumberEnabled)} />
                Phone Number
              </label>
              <input class="input" type="text" id="phoneNumber" name="phoneNumber" disabled={!phoneNumberEnabled} />
            </div>
          </div>
          <div class="columns">
            <div class="column is-full has-text-centered">
              <label for="Supervisor">Supervisor</label>
              <br />
              <div class="select is-primary">
                <select name="Supervisor">
                  {managers.map((manager) =>
                    <option value={manager}>{manager}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-full has-text-centered">
              <button class="button is-dark is-centered">Submit</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
